import { PICKUP, PICKUP_EXPRESS, PICKUP_MOMENT, PICKUP_STANDARD, formConfig } from '@/config/data/formConfig';
import { configBus } from '@/config/configBus';

/**
 * Get pickup moments.
 *
 * @param {Object} pickupLocation - Pickup location to render.
 *
 * @param {Array} pickupLocation.possibilities - Possibilities array.
 * @param {Object} pickupLocation.possibilities.delivery_type_name - Possibilities array.
 *
 * @returns {Object}
 */
export function getPickupMoments(pickupLocation) {

  // Sort moments by pickup time, from early to late.
  /**
   * @param {Object} dateA
   * @param {MyParcel.StartEndDate} dateA.moment
   * @param {Object} dateB
   * @param {MyParcel.StartEndDate} dateB.moment
   */
  pickupLocation.possibilities.sort((dateA, dateB) => {
    return new Date(dateA.moment.start.date) - new Date(dateB.moment.start.date);
  });

  return [
    {
      name: PICKUP_MOMENT,
      type: 'radio',
      choices: pickupLocation.possibilities.map((possibility) => {
        const pickupTime = configBus.formatTime(possibility.moment.start.date);
        const pickupText = `${configBus.strings.pickUpFrom} ${pickupTime}`;

        if (!configBus.isEnabled(possibility.delivery_type_name)) {
          return;
        }

        const deliveryTypeMap = {
          pickup: PICKUP_STANDARD,
          pickup_express: PICKUP_EXPRESS,
        };

        return {
          ...formConfig[PICKUP].options[deliveryTypeMap[possibility.delivery_type_name]],
          plainLabel: pickupText,
        };
      }),
    },
  ];
}
