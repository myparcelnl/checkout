/* eslint-disable max-lines-per-function */
import * as CONFIG from '@/config/data/formConfig';
import * as EVENTS from '@/config/data/eventConfig';
import * as SETTINGS from '@/config/data/settingsConfig';
import Vue from 'vue';
import { allowedCountryCodesForPlatform } from '@/config/data/countryConfig';
import { getConfig } from '@/config/setup';
import { getPickupDate } from '@/data/pickup/getPickupDate';

/**
 * The config bus to be used throughout the application. It's filled with `createConfigBus()`, otherwise the entire
 *  configBus will try to load before a configuration object can be provided.
 */
export let configBus;

/**
 * Creates the configBus object.
 *
 * @returns {configBus}
 */
export const createConfigBus = () => {
  configBus = new Vue({
    data: {
      /**
       * @type {MyParcel.CarrierData[]}
       */
      carrierData: [],

      /**
       * The current carrier.
       *
       * @type {MyParcel.CarrierNameOrId}
       */
      currentCarrier: null,

      /**
       * Dependency object, used for settings that depend on each other "vertically".
       *
       * Example: delivery > carrier > deliveryDate ⬅ [horizontal dependency]
       *                             | deliveryMoment
       *                             | shipmentOptions
       *                            ⬆️ [vertical dependencies that depend on siblings instead of their parent.].
       */
      dependencies: {},

      /**
       * Object to store all pickup data in to be able to send it back to the application.
       *
       * @type {object.<MyParcel.PickupLocation>}
       */
      pickupLocations: null,

      /**
       * Whether to show a modal or not.
       */
      showModal: false,

      /**
       * Data object to pass to modalComponent.
       *
       * @type {object}
       */
      modalData: null,

      /**
       * Array containing any errors causing the delivery options not to show.
       *
       * @type {Array}
       */
      errors: [],

      /**
       * The object where settings will be stored.
       *
       * @type {object}
       */
      values: {},

      /**
       * The object where the values that are sent to the external platform will be stored. Similar to `this.values`,
       *  but this object is tweaked to comply with our API and conventions and to maximize readability for the
       *  developers using it.
       *
       * @type {object}
       */
      exportValues: {},

      /**
       * Must be defined before it is filled in created().
       *
       * @type {MyParcel.DeliveryOptionsConfig}
       */
      config: null,

      /**
       * Must be defined before it is filled in created().
       *
       * @type {MyParcel.DeliveryOptionsStrings}
       */
      strings: null,

      /**
       * Must be defined before it is filled in created().
       *
       * @type {MyParcel.DeliveryOptionsAddress}
       */
      address: null,
    },
    computed: {
      /**
       * Whether the cc of the current address is in the list of valid codes for the current platform.
       *
       * @returns {boolean}
       */
      isValidCountry() {
        return allowedCountryCodesForPlatform().includes(this.address.cc);
      },

      /**
       * Whether there are multiple carriers available or not.
       *
       * @returns {boolean}
       */
      isMultiCarrier() {
        return this.carrierData.length > 1;
      },

      /**
       * The settings specific to the current carrier from the config, if any.
       *
       * @returns {object}
       */
      currentCarrierSettings() {
        return this.config[SETTINGS.CARRIER_SETTINGS].hasOwnProperty(this.currentCarrier)
          ? this.config[SETTINGS.CARRIER_SETTINGS][this.currentCarrier]
          : {};
      },
    },

    watch: {
      /**
       * When the current carrier changes update the export values.
       *
       * @param {MyParcel.CarrierName} value - New currentCarrier.
       */
      currentCarrier(value) {
        this.setExportValue(CONFIG.CARRIER, value);
      },
    },

    created() {
      // Load the configuration.
      const initialize = () => {
        const configuration = getConfig();

        /**
         * The configuration data.
         */
        Object.keys(configuration).forEach((item) => {
          this[item] = configuration[item];
        });

        this.weekdays = this.getWeekdays();

        document.dispatchEvent(new Event(EVENTS.UPDATE_DELIVERY_OPTIONS));
      };

      initialize();

      document.addEventListener(EVENTS.UPDATE_CONFIG_IN, initialize);
    },

    methods: {
      /**
       * Get the value of a given option in the config.
       *
       * ## Order of priority:
       * 1. `config.carrierData.<carrier>.<option>`        - Only if `carrier` is set!
       * 2. `config.carrierData.<currentCarrier>.<option>` - User defined carrier specific settings. Only if
       *                                                     option is not in the settingsWithoutCarrierOverride array.
       * 3. `config.<option>`                              - User defined default settings.
       * 4. `defaultConfig.<option>`                       - Will be in `this.config` if there are no user defined
       *                                                     default settings.
       *
       * @param {object|string} option  - Option object or name.
       * @param {string} key            - Key name to use. Defaults to "name".
       * @param {string|number} carrier - Carrier name or ID.
       *
       * @returns {*}
       */
      get(option, key = 'name', carrier = null) {
        let setting;
        if (typeof option === 'string') {
          option = { [key]: option };
        }

        // Return carrier specific settings if carrier is defined.
        if (!!carrier) {
          return this.getSettingsByCarrier(carrier)[option[key]];
        }

        // If the setting is in the settingsWithoutCarrierOverride array don't check the carrierSettings object.
        if (!SETTINGS.settingsWithoutCarrierOverride.includes(option[key])
          && this.currentCarrierSettings.hasOwnProperty(option[key])) {
          setting = this.currentCarrierSettings[option[key]];
        } else {
          setting = this.config[option[key]];
        }

        return setting;
      },

      /**
       * @param {string|number} price - Price config item or value.
       *
       * @returns {string}
       */
      formatPrice(price) {
        if (typeof price === 'string') {
          price = this.get(price, 'price');
        }

        const formatter = new Intl.NumberFormat(
          this.get(SETTINGS.LOCALE),
          {
            style: 'currency',
            currency: this.get(SETTINGS.CURRENCY),
          },
        );

        return formatter.format(Math.abs(price));
      },

      /**
       * Format distance for given amount of meters.
       *
       * @param {number|string} distance - Distance in meters.
       *
       * @returns {string}
       */
      formatDistance(distance) {
        const mToKm = 1000;

        let unit = 'm';

        if (distance >= mToKm) {
          const intl = new Intl.NumberFormat(this.get(SETTINGS.LOCALE), { maximumFractionDigits: 1 });
          distance = intl.format(distance / mToKm);
          unit = 'km';
        }

        return distance + unit;
      },

      /**
       * Check if a given option is enabled in the config or not. Returns false if the option is not present in the
       *  config or if `option.enabled` is false. Only returns true if `option.enabled` is present, in the config and
       *  true.
       *
       * @param {object} option - FormConfig options object.
       *
       * @param {string} key - String key to use with this.get().
       * @param {string|number} carrier - Carrier name or id.
       *
       * @returns {boolean}
       */
      isEnabled(option, key = null, carrier = null) {
        if (!option.hasOwnProperty('enabled') || !this.config.hasOwnProperty(option.enabled)) {
          return true;
        }

        const enabledInConfig = !!this.get(option.enabled, key, carrier);

        return option.hasOwnProperty('enabled') && enabledInConfig;
      },

      /**
       * Get the array of weekdays by using a (slightly) hacky trick with dates.
       *
       * @returns {string[]}
       */
      getWeekdays() {
        const dates = [];
        for (let day = 5; day <= 11; day++) {
          let date = new Date(1970, 1 - 1, day).toLocaleString(
            this.get(SETTINGS.LOCALE),
            { weekday: 'long' },
          );

          // Uppercase first letter.
          date = date.charAt(0).toUpperCase() + date.substring(1);

          dates.push(date);
        }

        return dates;
      },

      /**
       * Add errors to `this.errors` under a given key.
       *
       * @param {Array} errors - Errors to add.
       */
      addErrors(errors) {
        if (!errors.length) {
          return;
        }

        this.errors = [...this.errors, ...errors];
      },

      /**
       * Get the carrier specific settings for the given carrier.
       *
       * @param {string} carrier - Carrier name.
       *
       * @returns {object|boolean}
       */
      getSettingsByCarrier(carrier = this.currentCarrier) {
        if (!this.config.carrierSettings.hasOwnProperty(carrier)) {
          return false;
        }

        return this.config.carrierSettings[carrier];
      },

      /**
       * @param {string} setting - Setting name.
       *
       * @returns {boolean}
       */
      isEnabledInAnyCarrier(setting) {
        return Object.keys(this.config.carrierSettings).some((carrier) => this.getSettingsByCarrier(carrier)[setting]);
      },

      /**
       * Get a value by name.
       *
       * @param {string} name - Name of the property to add/update.
       *
       * @returns {*}
       */
      getValue(name) {
        return this.values[name];
      },

      /**
       * Set a property to the given value in the values object.
       *
       * @param {string} name - Name of the property to add/update.
       * @param {*} value - New value.
       */
      setExportValue(name, value) {
        this.exportValues[name] = value;
      },

      /**
       * Unset a property from the values object.
       *
       * @param {string} name - Name of the property to remove.
       */
      unsetExportValue(...name) {
        name.forEach((name) => delete this.exportValues[name]);
      },

      /**
       * Check if a value is present in the exportValues object.
       *
       * @param {string} name - Name of the item to check for.
       *
       * @returns {boolean}
       */
      hasExportValue(name) {
        return !!this.exportValues[name];
      },

      /**
       * Sets the delivery settings, removing anything related to pickup.
       */
      setDeliveryExportValues() {
        this.unsetExportValue(
          CONFIG.DELIVERY,
          CONFIG.DELIVERY_DATE,
          CONFIG.DELIVERY_MOMENT,
          CONFIG.PICKUP_LOCATION,
          CONFIG.PICKUP_MOMENT,
        );

        /**
         * Add a simple boolean for the external platform to be able to distinguish between pickup and delivery without
         *  having to check for the values of deliveryType.
         */
        this.setExportValue(CONFIG.IS_PICKUP, false);

        /**
         * Set deliveryType to what we call deliveryMoment internally.
         *
         * @see MyParcel.DeliveryType
         */
        this.setExportValue(CONFIG.DELIVERY_TYPE, this.getValue(CONFIG.DELIVERY_MOMENT));

        this.setExportValue(CONFIG.DATE, this.getValue(CONFIG.DELIVERY_DATE));
      },

      /**
       * Sets the pickup settings, removing anything related to delivery.
       */
      setPickupExportValues() {
        this.unsetExportValue(
          CONFIG.DELIVERY,
          CONFIG.DELIVERY_DATE,
          CONFIG.DELIVERY_MOMENT,
          CONFIG.PICKUP_MOMENT,
          CONFIG.SHIPMENT_OPTIONS,
        );

        /**
         * Add a simple boolean for the external platform to be able to distinguish between pickup and delivery without
         *  having to check for the values of deliveryType.
         */
        this.setExportValue(CONFIG.IS_PICKUP, true);

        /**
         * Set deliveryType to what we call pickupMoment internally.
         *
         * @see MyParcel.DeliveryType
         */
        this.setExportValue(CONFIG.DELIVERY_TYPE, this.getValue(CONFIG.PICKUP_MOMENT));

        const pickupLocation = this.getValue(CONFIG.PICKUP_LOCATION);

        // Only do this after a pickup location and moment are selected.
        if (!!pickupLocation && !!this.getValue(CONFIG.PICKUP_MOMENT)) {
          /**
           * Take out the possibilities array to use it to get the deliveryDate, but don't add it to the exportValues.
           * Also remove carrier from the currentPickupLocation object because it's already set in exportValues.carrier.
           */
          const { carrier, possibilities, ...currentPickupLocation } = this.$configBus.pickupLocations[pickupLocation];

          /**
           * Add the complex pickup data to the exported values instead of just the name.
           */
          this.setExportValue(CONFIG.PICKUP_LOCATION, currentPickupLocation);

          /**
           * Get the date from the currently selected pickup possibility.
           */
          this.setExportValue(CONFIG.DATE, getPickupDate(possibilities));
        }
      },

      /**
       * @param {MyParcel.CarrierName} carrierName - Carrier name.
       *
       * @returns {object}
       */
      getCarrierByName(carrierName) {
        return this.carrierData.find((carrier) => carrier.name === carrierName);
      },

      /**
       * Updates the configBus with the new delivery options data and communicate it to the external platform.
       *
       * @param {object} obj - Destructured update event.
       * @param {string} obj.name - Name of the setting that was updated.
       * @param {*} obj.value - Setting value.
       */
      updateExternalData({ name, value }) {
        this.values[name] = value;
        this.setExportValue(name, value);
        this.updateCurrentCarrier({ name, value });

        switch (this.getValue(CONFIG.DELIVERY)) {
          case CONFIG.DELIVER:
            this.setDeliveryExportValues({ name, value });
            break;
          case CONFIG.PICKUP:
            this.setPickupExportValues({ name, value });
            break;
        }

        // Using $nextTick to emit event after this function is done.
        // @see https://forum.vuejs.org/t/do-something-after-emit-has-finished-successful/10663/10
        this.$nextTick(() => {
          this.$emit(EVENTS.AFTER_UPDATE, { name, value });
        });
      },

      /**
       * Update the current carrier.
       *
       * @param {string} name - Setting that changed.
       * @param {MyParcel.CarrierName|number} value - New carrier or pickup location id.
       */
      updateCurrentCarrier({ name, value }) {
        switch (name) {
          case CONFIG.CARRIER:
            this.currentCarrier = value;
            break;
          case CONFIG.PICKUP_LOCATION:
            const givenPickupLocationExists = this.pickupLocations.hasOwnProperty(value);

            if (givenPickupLocationExists) {
              this.currentCarrier = this.pickupLocations[value].carrier;
            }
            break;
        }
      },
    },
  });

  return configBus;
};
