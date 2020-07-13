## [3.1.4](https://github.com/myparcelbe/checkout/compare/v3.1.3...v3.1.4) (2020-02-24)


### Bug Fixes

* carrier logos not being displayed ([bcec807](https://github.com/myparcelbe/checkout/commit/bcec807948207d9ef1e55330504bda389d8d51bf))



## [3.1.3](https://github.com/myparcelbe/checkout/compare/v3.1.2...v3.1.3) (2020-02-05)


### Bug Fixes

* deliveryEnabled and pickupEnabled are not set correctly ([#10](https://github.com/myparcelbe/checkout/issues/10)) ([f66f640](https://github.com/myparcelbe/checkout/commit/f66f6405a9339d7de9f0d8f97f181ddfe4297d53))



## [3.1.2](https://github.com/myparcelbe/checkout/compare/v3.1.1...v3.1.2) (2020-02-03)



## [3.1.1](https://github.com/myparcelbe/checkout/compare/v3.1.0...v3.1.1) (2019-12-17)


### Bug Fixes

* allow dpd pickup locations in specific countries ([#8](https://github.com/myparcelbe/checkout/issues/8)) ([0294b4b](https://github.com/myparcelbe/checkout/commit/0294b4be5060d0a499a8bb339ebe6f9d1d817330))



# [3.1.0](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.11...v3.1.0) (2019-12-13)



# [3.1.0-alpha.11](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.10...v3.1.0-alpha.11) (2019-12-12)


### Bug Fixes

* double selected marker ([060b329](https://github.com/myparcelbe/checkout/commit/060b329113c400523eac90d4bd5457b517db0131))
* pickup location not updated on click marker ([78b96b4](https://github.com/myparcelbe/checkout/commit/78b96b416653fdc90fbdb83b2630a854d3d11680))
* pickup variables not set correctly on opening map and fixing empty value not being sent on disable ([8daba39](https://github.com/myparcelbe/checkout/commit/8daba390a04e6bf0c6505975a067c331b813b9ca))
* settings not "remembered" across components ([ef85686](https://github.com/myparcelbe/checkout/commit/ef85686aaeb35eed08ae8c907eb7cee9c5e1c480))



# [3.1.0-alpha.10](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.9...v3.1.0-alpha.10) (2019-12-11)


### Bug Fixes

* reactivity bug in recursive form ([d7a5b2a](https://github.com/myparcelbe/checkout/commit/d7a5b2a902ddb6e25580b36b45365102417300da))



# [3.1.0-alpha.9](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.8...v3.1.0-alpha.9) (2019-12-05)


### Bug Fixes

* select the first marker on map view so there can't be orders made with empty pickup location ([2e46b66](https://github.com/myparcelbe/checkout/commit/2e46b6631b0908af45a254ba19206055c34c307c))



# [3.1.0-alpha.8](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.7...v3.1.0-alpha.8) (2019-12-05)


### Bug Fixes

* don't load scripts if requirejs is present or if they are already loaded ([54e6a31](https://github.com/myparcelbe/checkout/commit/54e6a31545ba8c5af4515a95278e30e2f6123c94))



# [3.1.0-alpha.7](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.6...v3.1.0-alpha.7) (2019-12-05)


### Bug Fixes

* calling functions too early ([4bbd4b8](https://github.com/myparcelbe/checkout/commit/4bbd4b8078dea93d636aa4cb1723d9087012ead0))



# [3.1.0-alpha.6](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.5...v3.1.0-alpha.6) (2019-12-03)


### Bug Fixes

* make strings for list or map pickup locations customizable ([962bae2](https://github.com/myparcelbe/checkout/commit/962bae29b91603a81187509f1233dfe852f3d878))
* rename the pickup button strings and add it to typings ([e8d53d0](https://github.com/myparcelbe/checkout/commit/e8d53d03569c2602bb1a91586720613229336c6a))



# [3.1.0-alpha.5](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.4...v3.1.0-alpha.5) (2019-12-03)


### Bug Fixes

* config being overridden by developerinfo ([e392196](https://github.com/myparcelbe/checkout/commit/e39219675a17f4c6f82b72cffe45e743a47c9bd3))



# [3.1.0-alpha.4](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.3...v3.1.0-alpha.4) (2019-11-29)



# [3.1.0-alpha.3](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.2...v3.1.0-alpha.3) (2019-11-29)



# [3.1.0-alpha.2](https://github.com/myparcelbe/checkout/compare/v3.1.0-alpha.1...v3.1.0-alpha.2) (2019-11-28)


### Bug Fixes

* **layout:** move carrier logo in pickup location details under the header ([2514c4d](https://github.com/myparcelbe/checkout/commit/2514c4d0d009a9faa581bc3c716b4ff7c1c820e6))
* close button appearing above inline modal and give it a separate class if it is inline to remove padding ([56fc7b9](https://github.com/myparcelbe/checkout/commit/56fc7b9c822c9b0460f0fb7bd2444669994d27ac))
* error on changing address while pickup is selected ([4980635](https://github.com/myparcelbe/checkout/commit/498063564290a6b01a162e8a23d0b3a8a1e60552))
* make modal pass any slots to <component> ([0199183](https://github.com/myparcelbe/checkout/commit/01991833e813eca187cb89120d1131f03864bc20))
* use the js-sdk via npm ([d17a49a](https://github.com/myparcelbe/checkout/commit/d17a49a16e9dd318192ca5e0b4a31e969db9f57e))


### Features

* maps functionality ([42869f3](https://github.com/myparcelbe/checkout/commit/42869f300ca44f91a6aae4625e4954fc98f6fa9d))



# [3.1.0-alpha.1](https://github.com/myparcelbe/checkout/compare/3.1.0-alpha.1...v3.1.0-alpha.1) (2019-11-18)



# [3.1.0-alpha.1](https://github.com/myparcelbe/checkout/compare/3.1.0-alpha.0...3.1.0-alpha.1) (2019-11-14)


### Features

* first version of pickup locations map feature ([51266d7](https://github.com/myparcelbe/checkout/commit/51266d7425e2faf047c123abc22dc971b16d00c4))



## [3.0.27](https://github.com/myparcelbe/checkout/compare/3.0.26...3.0.27) (2019-11-14)


### Bug Fixes

* no more error on empty address and hides self when it has nothing to show ([ae4dfc5](https://github.com/myparcelbe/checkout/commit/ae4dfc53e95c8a09cd0d44cd58af43587754cbbb))



## [3.0.26](https://github.com/myparcelbe/checkout/compare/3.0.25...3.0.26) (2019-11-13)


### Bug Fixes

* don't update the address if it didn't change, avoiding unnecessary reloading ([a797f62](https://github.com/myparcelbe/checkout/commit/a797f62b589861fadc29f38d12c763bb68438f91))



## [3.0.25](https://github.com/myparcelbe/checkout/compare/3.0.24...3.0.25) (2019-11-13)


### Bug Fixes

* add padding to pickup list icons ([05dca79](https://github.com/myparcelbe/checkout/commit/05dca790cf0d3ae1513872aa33806ac93907a655))
* add pointer cursor to clickable elements ([13c3a5f](https://github.com/myparcelbe/checkout/commit/13c3a5fdd69c800ac64b47bea1474dbe57c39fc2))
* improve error handling and fix address error modal not showing in many cases ([3220400](https://github.com/myparcelbe/checkout/commit/32204009d9267bcba262901c84fd810125dc0449))
* simplify logic of error modal ([9a93ca8](https://github.com/myparcelbe/checkout/commit/9a93ca81809b55a8bf795764937612144d408a4c))
* sort pickup locations by distance only if it is available. otherwise use alphabetical order ([dd932d6](https://github.com/myparcelbe/checkout/commit/dd932d6155833c9af3437915efa486711d0b75d6))



## [3.0.24](https://github.com/myparcelbe/checkout/compare/3.0.23...3.0.24) (2019-11-11)


### Bug Fixes

* add render event to (re)load the entire app ([472ad56](https://github.com/myparcelbe/checkout/commit/472ad56f957648b20c21b31eed4e084f3485ec47))



## [3.0.23](https://github.com/myparcelbe/checkout/compare/3.0.22...3.0.23) (2019-10-31)



## [3.0.22](https://github.com/myparcelbe/checkout/compare/3.0.21...3.0.22) (2019-10-25)


### Bug Fixes

* error modal could be closed ([d70b3d5](https://github.com/myparcelbe/checkout/commit/d70b3d5ad6fd1c83b213f314e2fcb55d36380721))



## [3.0.21](https://github.com/myparcelbe/checkout/compare/3.0.20...3.0.21) (2019-10-24)


### Bug Fixes

* add word-break: normal ([e4369fe](https://github.com/myparcelbe/checkout/commit/e4369fec0960c61054259785842f63d06637ba1c))
* bug that was found by the new tests :) ([1aa820b](https://github.com/myparcelbe/checkout/commit/1aa820bdbcd2e9edf133fada3c0ece61a751bfc2))
* error in getDefaultRequestParameters.js causing the dpd workaround to not work ([9b31ab5](https://github.com/myparcelbe/checkout/commit/9b31ab57a951545d8798176f2152ec337d738bdd))
* Make show_delivery_options do nothing if it was already showing and add missing removeEventListener calls to onDestroy ([126bdb3](https://github.com/myparcelbe/checkout/commit/126bdb31da5b695f0d992bdc97e55ace4ab616f3))
* More strict css, less easy for it to be overridden. Fixes opening hours wrapping on long pickup location titles and close modal button not being clickable. ([6ae7336](https://github.com/myparcelbe/checkout/commit/6ae733647f594633f861ecea99c89ea4b342e705))
* remove background-color from modal ([8317a08](https://github.com/myparcelbe/checkout/commit/8317a08bb4de0a834f07b32c5979908edb39b3fa))



## [3.0.20](https://github.com/myparcelbe/checkout/compare/3.0.19...3.0.20) (2019-10-21)



## [3.0.19](https://github.com/myparcelbe/checkout/compare/3.0.18...3.0.19) (2019-10-07)


### Bug Fixes

* skeleton loader showing forever on loading without anything enabled ([a956d8f](https://github.com/myparcelbe/checkout/commit/a956d8fbac3ed66cc6d801e6964f4720708fca99))
* wrong date format for delivery when delivery days window === 0 ([32ed006](https://github.com/myparcelbe/checkout/commit/32ed00661bb2779bff426aa098ad95804f2c8c20))



## [3.0.18](https://github.com/myparcelbe/checkout/compare/3.0.17...3.0.18) (2019-10-03)



## [3.0.17](https://github.com/myparcelbe/checkout/compare/3.0.16...3.0.17) (2019-10-01)



## [3.0.16](https://github.com/myparcelbe/checkout/compare/3.0.15...3.0.16) (2019-09-26)



## [3.0.15](https://github.com/myparcelbe/checkout/compare/3.0.14...3.0.15) (2019-09-25)



## [3.0.14](https://github.com/myparcelbe/checkout/compare/3.0.13...3.0.14) (2019-09-20)



## [3.0.13](https://github.com/myparcelbe/checkout/compare/3.0.12...3.0.13) (2019-09-18)



## [3.0.12](https://github.com/myparcelbe/checkout/compare/3.0.11...3.0.12) (2019-09-13)



## [3.0.11](https://github.com/myparcelbe/checkout/compare/3.0.10...3.0.11) (2019-09-13)



## [3.0.10](https://github.com/myparcelbe/checkout/compare/3.0.9...3.0.10) (2019-09-12)



## [3.0.9](https://github.com/myparcelbe/checkout/compare/3.0.8...3.0.9) (2019-09-11)



## [3.0.8](https://github.com/myparcelbe/checkout/compare/3.0.7...3.0.8) (2019-09-10)



## [3.0.7](https://github.com/myparcelbe/checkout/compare/3.0.6...3.0.7) (2019-09-09)



## [3.0.6](https://github.com/myparcelbe/checkout/compare/3.0.5...3.0.6) (2019-09-04)



## [3.0.5](https://github.com/myparcelbe/checkout/compare/3.0.4...3.0.5) (2019-09-04)



## [3.0.4](https://github.com/myparcelbe/checkout/compare/3.0.3...3.0.4) (2019-09-03)



## [3.0.3](https://github.com/myparcelbe/checkout/compare/3.0.1...3.0.3) (2019-09-02)



## [3.0.1](https://github.com/myparcelbe/checkout/compare/3.0.0...3.0.1) (2019-08-30)



# [3.0.0](https://github.com/myparcelbe/checkout/compare/v0.1.1...3.0.0) (2019-08-30)


### Bug Fixes

* the select of the delivery date ([5d25704](https://github.com/myparcelbe/checkout/commit/5d2570492d17de6f6a3e3ddae3a8e981c073a7e0))



# 0.1.0 (2016-11-02)



