// Ionic Starter App
(function() {
    'use strict';

    angular.module('app', [
        'ionic',
        'ngCordova',
        'ngResource',

        "ui.bootstrap.tpls",
        "ui.bootstrap.datepicker"
    ])

    .run([

        '$ionicPlatform', '$rootScope', '$stateParams', '$state', 'AuthService', '$templateCache',

        function($ionicPlatform, $rootScope, $stateParams, $state, AuthService, $templateCache) {




            $templateCache.put('state/announcements/announcements.html', '<ion-view id="announcements"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-nav-bar="false"\n>\n    <ion-nav-view name="announcements">\n    </ion-nav-view>\n\n    <ion-footer-bar class="bar-positive row footer">\n        <div class="col"\n            touch\n            ng-click="Announcements.goToEventListHandler()"\n        >\n            <span>이벤트</span>\n        </div>\n        <div class="col"\n            touch\n            ng-click="Announcements.goToNoticeListHandler()"\n        >\n            <span>공지사항</span>\n        </div>\n    </ion-footer-bar>\n</ion-view>\n');

            $templateCache.put('state/balance/balance.html', '<ion-view id="balance">\n    <ion-nav-view\n        name="balance"\n    >\n    </ion-nav-view>\n</ion-view>\n');

            $templateCache.put('state/cancel/cancel.html', '<ion-view view-title="예약취소" id="cancel">\n    <ion-content>\n        <ul class="list">\n            <li class="row row-list auto radius-bottom radius-top shadow zero"\n                ng-repeat="booking in Cancel.Model.current.bookings"\n                ng-if="Cancel.isNotCancelled(booking);"\n            >\n                <div class="c1 col-70 row wrap">\n                    <div class="col-100 shop-name">\n                        <span>{{booking.place.name}}</span>\n                    </div>\n\n                    <div class="col-30">\n                        <span>날짜</span>\n                    </div>\n                    <div class="col-70">\n                        <span>{{booking.datetime | date: \'yyyy.MM.dd\'}}</span>\n                    </div>\n\n                    <div class="col-30">\n                        <span>시간</span>\n                    </div>\n                    <div class="col-70">\n                        <span>{{booking.datetime | date: \'HH:mm\'}}</span>\n                    </div>\n\n                    <div class="col-30">\n                        <span>예약정보</span>\n                    </div>\n                    <div class="col-70">\n                        <span>{{booking.procuts[0].product.name}}</span>\n                    </div>\n\n                </div>\n                <div class="c2 col-30 zero radius-right"\n                    ng-click="Cancel.cancelHandler(booking.id, $index);"\n                >\n                    <span>\n                        예약취소\n                    </span>\n                </div>\n            </li>\n        </ul>\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/daumMap/daumMap.html', '<ion-view id="daum-map"\n    view-title="전체보기"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="true"\n    hide-nav-bar="false"\n>\n    <ion-nav-buttons side="left">\n        <button class="button button-icon icon ion-android-arrow-back"\n            ng-click="Map.goToHandler(\'main.home\')"\n        >\n        </button>\n    </ion-nav-buttons>\n\n    <ion-nav-buttons side="right">\n        <button class="button button-icon icon ion-pinpoint"\n            ng-click="Map.findMeThenSearchNearBy()"\n        >\n        </button>\n    </ion-nav-buttons>\n\n    <ion-header-bar class="bar-subheader zero">\n        <div class="r1 row row-search flex zero">\n            <div class="c1 col-82 zero">\n                <input id="daum-map-search-input" type="text"\n                    placeholder="상호명, 지역, 지하철 역을 검색하세요."\n                    ng-model="Map.search"\n                >\n            </div>\n            <div class="c2 col-10 flex"\n                touch\n                ng-click="Map.searchLocationNearBy(Map.search);"\n            >\n                <i class="ion-search"></i>\n            </div>\n        </div>\n    </ion-header-bar>\n\n    <ion-content class="has-subheader"\n        data-tap-disable="true"\n        scroll="false"\n    >\n        <div class="r2 row row-daum-map zero">\n            <div class="c1 col zero">\n                <div daum-map\n                    marker-src="img/800/icon/icon_map_s.png"\n                    marker-clicked-src="img/800/icon/icon_map_s.png"\n                    marker-width="30"\n                    marker-height="43"\n                ></div>\n            </div>\n        </div>\n\n    </ion-content>\n\n</ion-view>\n');

            $templateCache.put('state/daumMap/placeModal.html', '<ion-modal-view id="daum-map-modal">\n    <ion-content class="daum-map-modal-content">\n        <div class="daum-map-modal-container">\n\n            <div class="r1 row row-title zero"\n                touch\n                ng-click="Map.Model.modal.hide()"\n            >\n                <div class="c1 col-90 flex">\n                    <p>\n                        {{ Map.Model.selectedPlace.name }}\n                    </p>\n                </div>\n                <div class="c2 col flex"\n                >\n                    <i class="icon ion-ios-close-empty"></i>\n                </div>\n            </div>\n            <div class="r2 row row-content zero radius-bottom relative"\n                touch\n                ng-click="Map.goToDetailHandler()"\n            >\n                <div class="c1 col zero radius-bottom">\n                    <img class="radius-bottom"\n                        ng-src="{{ Map.Model.selectedPlace.photos[0].url }}"\n                    >\n\n                    <div class="description absolute radius-bottom">\n                        <div class="row row-description flex-v zero radius-bottom">\n                            <div class="c1 col-14 flex">\n                                <img src="img/800/icon/icon_map_s.png" alt="Nail Icon">\n                            </div>\n                            <div class="c2 col-54">\n                                <span>{{ Map.Model.selectedPlace.address }}</span>\n                            </div>\n                            <div class="c3 col flex">\n                                <i class="more-icon"></i>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-modal-view>\n');

            $templateCache.put('state/detail/detail.html', '<ion-view id="detail"\n    cache-view="false"\n    can-swipe-back="false"\n    hide-back-button="false"\n>\n<!-- <ion-nav-buttons side="left">\n    <button class="button button-icon icon ion-android-arrow-back"\n        ng-click="Detail.goBackHandler();"\n    >\n    </button>\n</ion-nav-buttons>\n -->\n <ion-nav-title>\n    {{Detail.Model.current.name}}\n</ion-nav-title>\n<ion-nav-buttons side="right">\n    <button class="button button-icon icon ion-heart"\n        ng-click="Detail.toggleSavePlace()"\n        ng-class="{\'favorite-place\': Detail.isFavorite()}"\n    >\n    </button>\n</ion-nav-buttons>\n\n\n    <!-- List Detail Content -->\n    <ion-content class="has-header">\n\n        <ion-slide-box class="non-row-slide-box" show-pager="true">\n            <ion-slide class="row-slides zero"\n                ng-repeat="photo in Detail.interiorPhotos"\n            >\n                <img class="place-image"\n                    ng-src="{{photo.url}}"\n                >\n            </ion-slide>\n        </ion-slide-box>\n        <div></div>\n\n        <!-- 상세정보 -->\n        <div class="row row-title-bar">\n            <div class="c1 col">\n                <h3>상세정보</h3>\n            </div>\n        </div>\n        <div class="detail-container auto">\n            <div class="row">\n                <div class="col-21 col-title">\n                    <p class="zero">이용시간</p>\n                    <p class="zero">전화번호</p>\n                    <p class="zero">주소</p>\n                    <p class="zero">가격정보</p>\n                </div>\n                <div class="col-79 col-text">\n                    <p class="zero">TODO: 10:00 ~ 21:00</p>\n                    <p class="zero">{{Detail.Model.current.phone}}</p>\n                    <p class="zero text-overflow">{{Detail.Model.current.address}}</p>\n                    <ul class="product-list">\n                        <li class="product-item"\n                            ng-repeat="product in Detail.Model.current.products | orderBy:\'price\'"\n                        >\n                            {{product.name}} - {{product.price}}\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n\n\n        <!-- 포트폴리오 -->\n        <div class="row row-title-bar zero flex">\n            <div class="c1 col zero">\n                <h3 class="zero">포트폴리오</h3>\n            </div>\n        </div>\n        <ion-scroll class="portfolio-scroll"\n            zooming="false"\n            direction="x"\n            parent-scroll\n        >\n            <div class="portfolio-inner-scroll row zero"\n            >\n                <div class="col inner-scroll-item zero"\n                    ng-repeat="portfolioPhoto in Detail.portFolioPhotos"\n                >\n                    <img ng-src="{{portfolioPhoto.url}}">\n                </div>\n            </div>\n        </ion-scroll>\n\n\n        <!-- 예약현황 -->\n        <div class="row row-title-bar row-reserve-title">\n            <div class="col">\n                <h3>원하는 날짜를 선택해주세요.</h3>\n            </div>\n        </div>\n\n        <!-- {{Detail.Model.test}} -->\n        <div class="date-picker-container">\n            <datepicker class="date-picker"\n                ng-model="Detail.date"\n                show-weeks="false"\n                custom-class="Detail.dateStyler(date, mode)"\n            >\n            </datepicker>\n        </div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    </ion-content>\n\n</ion-view>\n');

            $templateCache.put('state/favorite/favorite.html', '<ion-view view-title="즐겨찾는 shop" id="favorite">\n    <ion-content>\n        <ul class="list">\n            <li class="r1 shop-list row row-item auto radius-top radius-bottom shadow"\n                ng-repeat="place in Favorite.Model.placeList"\n                ng-click="Favorite.goToDetailHandler(place)"\n            >\n                <div class="c1 col-25 place-image flex">\n                    <img ng-src="{{place.photos[0].url}}">\n                </div>\n                <div class="c2 col-75 row wrap zero">\n                    <div class="col-100 place-name">\n                        <span>{{place.name}}</span>\n                    </div>\n                    <div class="col-100 row detail">\n                        <div class="col-10">\n                            <i class="place-icon"></i>\n                        </div>\n                        <div class="col-60 place-address">\n                            <span>{{place.address}}</span>\n                        </div>\n                        <div class="col-30">\n                            <i class="detail-icon"></i>\n                        </div>\n                    </div>\n                </div>\n\n            </li>\n        </ul>\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/list/list.html', '<ion-view id="list"\n    view-title="즐겨찾는 shop"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="true"\n    hide-nav-bar="false"\n>\n    <!-- Set navigation header -->\n    <ion-nav-buttons side="left">\n        <button class="button button-icon icon ion-navicon"\n            ng-click="Main.toggleSideMenu()"\n        >\n        </button>\n    </ion-nav-buttons>\n    <ion-nav-buttons side="right">\n        <button class="button button-icon icon ion-android-share-alt">\n        </button>\n    </ion-nav-buttons>\n\n    <!-- List Content -->\n    <ion-content class="has-header">\n        <ion-refresher\n            pulling-text="새로운 내용이 있는지 보시려면 힘것 당기세요."\n            on-refresh="List.doRefresh()"\n            on-pulling=""\n            pulling-icon="ion-android-arrow-down"\n            disable-pulling-rotation="false"\n        >\n        </ion-refresher>\n\n        <div class="r1 row">\n            <div class="c1 col">\n                <h2>This is a list headline</h2>\n            </div>\n        </div>\n\n        <ion-list>\n            <ion-item class="r2 row-items row flex"\n                collection-repeat="item in List.lists"\n                item-width="100%"\n                item-height="vw * 0.30"\n                item-render-buffer="3"\n                force-refresh-images="false"\n                ng-click="List.itemHandler(item)"\n            >\n                <div class="c1 col">\n                    <span >\n                        {{item.title}}\n                    </span>\n                </div>\n            </ion-item>\n        </ion-list>\n        <!-- Checked immediately as soon as page is entered. -->\n        <ion-infinite-scroll\n            on-infinite="List.getData()"\n            distance="1%"\n            spinner="true"\n            immediate-check="true"\n            ng-if="List.checkForMore()"\n        >\n        </ion-infinite-scroll>\n\n    </ion-content>\n\n</ion-view>\n');

            $templateCache.put('state/login/login.html', '<ion-view id="login">\n    <ion-content class="no-header bg">\n        <div class="row r1 flex">\n            <div class="c1 col-57"\n                touch\n            >\n                <i class="facebook-button"></i>\n            </div>\n        </div>\n        <div class="row r2 flex">\n            <div class="c1 col-57"\n                touch\n            >\n                <i class="kakao-button"></i>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>');

            $templateCache.put('state/main/main.html', '<ion-view id="main">\n    <ion-side-menus>\n        <ion-side-menu-content\n            edge-drag-threshold="false"\n            drag-content="false"\n        >\n        <!-- Main View -->\n            <ion-nav-bar class="bar-positive"\n                align-title="center"\n                no-tap-scroll="true"\n                delegate-handle="main"\n            >\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n\n            <ion-nav-view name="main">\n            </ion-nav-view>\n\n        </ion-side-menu-content>\n\n        <!-- Side Menu -->\n        <ion-side-menu side="left" class="side-menu-container">\n            <ion-content class="side-menu-content">\n                <ul>\n\n                    <!-- Row 1 -->\n                    <li class="r1 row row-header flex">\n                        <div class="col-30">\n                            <img class="picture"\n                                ng-src="{{Main.user.picture}}"\n                            >\n                        </div>\n                        <div class="col-70">\n                            <span class="username">\n                                {{ Main.user.name }} 님\n                            </span>\n                        </div>\n                    </li>\n\n                    <!-- Side Menu list -->\n                    <li class="r2 row row-menu-list flex-v zero"\n                        ng-repeat="item in Main.Model.sideMenuLists"\n                        ng-class="\n                            {\'selected\':\n                                Main.getCurrentState() === item.state\n                            }\n                        "\n                        ng-click="Main.menuSelectHandler(item)"\n                    >\n                        <div class="col-85 col-list-text zero">\n                            <p> {{ item.text }} </p>\n                        </div>\n                        <div class="col-10 col-icon">\n                            <i class="ion-ios-arrow-right"></i>\n                        </div>\n                    </li>\n                </ul>\n\n                <div class="row row-menu-list flex-v row-setting zero"\n                    ng-click="Main.toggleAccordion();"\n                >\n                    <div class="col-85 col-list-text zero">\n                        <p>설정</p>\n                    </div>\n                    <div class="col-10 col-icon zero">\n                        <i class="ion-ios-arrow-right"></i>\n                    </div>\n\n                </div>\n                    <div class="accordion"\n                        ng-show="Main.settingSubMenu === true"\n                    >\n\n                        <div class="row row-menu-list row-accordion flex-v zero"\n                            ng-click="Main.toggleSettingHandler(\'location\')"\n                            ng-class="{\'activate\': Main.Model.setting.location === \'on\'}"\n                        >\n                            <div class="col-30 col-list-text">\n                                <p>위치설정</p>\n                            </div>\n                            <div class="col-20">\n                                <i class="ion-android-locate"></i>\n                            </div>\n\n                        </div>\n\n                        <div class="row row-menu-list flex-v zero"\n                            ng-click="Main.toggleSettingHandler(\'push\')"\n                            ng-class="{\'activate\': Main.Model.setting.push === \'on\'}"\n                        >\n                            <div class="col-30 col-list-text">\n                                <p>푸쉬알람</p>\n                            </div>\n                            <div class="col-20">\n                                <i class="ion-ios-bell-outline"></i>\n                            </div>\n\n                        </div>\n\n                    </div>\n            </ion-content>\n\n            <ion-footer-bar class="side-menu-footer flex" touch>\n                <i class="side-menu-footer-icon"></i>\n            </ion-footer-bar>\n\n        </ion-side-menu>\n\n    </ion-side-menus>\n\n\n\n</ion-view>\n');

            $templateCache.put('state/mainHome/mainHome.html', '<ion-view id="main-home"\n    view-title="오늘 Nail"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="true"\n    hide-nav-bar="false"\n>\n    <!-- Set navigation header -->\n    <ion-nav-buttons side="left">\n        <button class="button button-icon icon ion-navicon-round"\n            ng-click="Main.toggleSideMenu()"\n        >\n        </button>\n    </ion-nav-buttons>\n    <ion-nav-buttons side="right">\n        <button class="button button-icon icon ion-android-share-alt">\n        </button>\n    </ion-nav-buttons>\n\n\n\n    <!-- Home Content -->\n    <ion-content class="has-header">\n\n        <!-- ROw 1 -->\n        <div class="r1 row zero">\n            <div class="c1 col zero">\n            </div>\n        </div>\n\n\n        <!-- Row 2 -->\n        <!-- APP SPECIFIC -->\n        <div class="row row-search flex zero"\n            ng-click="Home.searchHandler()"\n        >\n            <div class="c1 col-82 zero">\n                <input type="text"\n                    placeholder="상호명, 지역, 지하철 역을 검색하세요."\n                    style="pointer-events:none;"\n                    ng-model="Map.search"\n                >\n            </div>\n            <div class="c2 col-10 flex"\n            >\n                <i class="ion-search"></i>\n            </div>\n        </div>\n\n        <!-- Row 3 -->\n        <div class="r3 row flex">\n            <div class="c1 col-32 overall"\n                touch\n                ng-click="Home.goToHandler(\'main.daumMap\')"\n            >\n                <i class="overall-icon"></i>\n            </div>\n            <div class="c2 col-32 favorite-shop"\n                touch\n                ng-click="Home.goToHandler(\'main.favorite\')"\n            >\n                <i class="heart-icon"></i>\n            </div>\n        </div>\n\n        <!-- Row 4 -->\n        <div class="r4 row flex">\n            <div class="c1 col-32 quick-service"\n                touch\n                ng-click="Home.goToHandler(\'main.daumMap\', {from:\'quick\'})"\n            >\n                <i class="quick-service-icon"></i>\n            </div>\n            <div class="c2 col-32 show-off"\n                touch\n                ng-click="Home.goToHandler(\'main.show.list\')"\n            >\n                <i class="show-off-icon"></i>\n            </div>\n        </div>\n    </ion-content>\n\n</ion-view>\n');

            $templateCache.put('state/schedule/reserveModal.html', '<ion-modal-view id="reserve-modal">\n    <ion-content class="reserve-modal-content">\n        <div class="content-wrapper relative">\n\n            <div class="row row-close zero">\n                <div class="col-15 col-x-icon zero flex"\n                    ng-click="Schedule.closeModalHandler()"\n                >\n                    <i class="ion-ios-close-empty"></i>\n                </div>\n            </div>\n\n            <div class="row row-service-container zero"\n                ng-repeat="product in Schedule.Model.current.products"\n                ng-click="Schedule.selectProductHandler(product)"\n                ng-class="{selected: Schedule.isSelectedProduct(product)}"\n            >\n                <div class="col-20 flex zero">\n                    <div class="circle">\n                    </div>\n                </div>\n                <div class="col-80 flex-v zero">\n                    <p>{{product.name}}</p>\n                </div>\n            </div>\n\n            <div class="row-name row flex-v">\n                <div class="col-20 col-name zero flex">\n                    <p class="zero">이름</p>\n                </div>\n                <div class="col-65 col-input zero">\n                    <input type="text" placeholder="이름을 입력해주세요."\n                        ng-model="Schedule.Model.form.userKoreanName"\n                    >\n                </div>\n            </div>\n\n            <div class="row-phone row">\n                <div class="col-20 col-phone zero flex">\n                    <p class="zero">연락처</p>\n                </div>\n                <div class="col-65 col-phone-input zero">\n                    <input type="number" placeholder="전화번호를 입력해주세요."\n                        ng-model="Schedule.Model.form.userPhoneNumber"\n                    >\n                </div>\n            </div>\n\n            <div class="row-foot-note flex">\n                <div class="col-wrapper">\n                    <p class="zero">* 원하시는 디자어너가 있으시면 유선 연락 바랍니다.</p>\n                    <p class="zero">* 예약취소는 \'설정\'을 이용해주세요.</p>\n                </div>\n            </div>\n\n            <div class="row-reserve row flex">\n\n               <div class="zero col-40 col-button flex"\n                    ng-click="Schedule.bookingHandler();"\n               >\n                   <p class="zero">\n                       예약\n                   </p>\n               </div>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-modal-view>\n');

            $templateCache.put('state/schedule/schedule.html', '<ion-view id="schedule"\n    view-title="예약하기"\n    cache-view="false"\n    hide-back-button="false"\n>\n    <!-- List Content -->\n    <ion-content class="has-header">\n        <ul ng-if="Schedule.Model.viewSlots.length > 1 ">\n            <li class="r1 row-items row flex"\n                ng-repeat="reserveSlot in Schedule.Model.viewSlots track by $index"\n                ng-class="{selected: Schedule.isSelectedSlot(reserveSlot)}"\n                ng-click="Schedule.selectSlotHandler(reserveSlot, $index)"\n            >\n                <div class="c1 col zero">\n                    <span>\n                        {{ reserveSlot.format(\'HH:mm\')}}\n                    </span>\n                </div>\n                <div class="c2 col zero"\n                >\n                    <span class="not-available"\n                        ng-if="!Schedule.isAvailableSlot(reserveSlot)"\n                    >\n                        예약불가\n                    </span>\n                    <span class="available"\n                        ng-if="Schedule.isAvailableSlot(reserveSlot);"\n                    >\n                        예약가능\n                    </span>\n                </div>\n            </li>\n        </ul>\n        <h2 class="positive" ng-if="Schedule.Model.viewSlots.length <= 1">\n            오늘은 쉬는 날입니다\n        </h2>\n    </ion-content>\n\n</ion-view>\n');

            $templateCache.put('state/show/show.html', '<ion-view id="show"\n    view-title="자랑하기"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="false"\n    hide-nav-bar="false"\n>\n    <ion-nav-view name="show">\n    </ion-nav-view>\n\n    <ion-footer-bar class="bar-positive row footer">\n        <div class="col"\n            touch\n            ng-click="Show.modalShowHandler()"\n        >\n            <span>새 글 쓰기</span>\n        </div>\n        <div class="col"\n            touch\n            ng-click="Show.goToSavedPostListHandler()"\n        >\n            <span>마이 갤러리</span>\n        </div>\n    </ion-footer-bar>\n</ion-view>\n');

            $templateCache.put('state/show/showModal.html', '<ion-modal-view id="show-modal">\n    <ion-content class="black-70">\n        <div class="row r1 flex row-90">\n            <div class="c1 col-80">\n                <span>새 글 쓰기</span>\n            </div>\n            <div class="c2 col-20"\n                ng-click="Show.modalHideHandler()"\n            >\n                <button class="button button-icon icon ion-ios-close-empty"></button>\n            </div>\n        </div>\n\n        <div class="row r2 row-90 flex">\n            <div class="c1 col-40 col"\n                ng-click="Show.getPictureHandler(1)"\n                touch\n            >\n                <span>사진찍기</span>\n            </div>\n            <div class="c2 col-40 col"\n                ng-click="Show.getPictureHandler(0)"\n                touch\n            >\n                <span>사진고르기</span>\n            </div>\n\n        </div>\n\n        <div class="row row-image flex">\n            <div class="col-90 zero">\n                <img class="camera-image" alt="no-img"\n                    ng-src="{{ Show.writeImageSrc }}"\n                    ng-if="Show.showWriteImage()"\n                >\n            </div>\n        </div>\n\n        <div class="row row-90 r3">\n            <div class="c1 col-20">\n                <span>제목</span>\n            </div>\n            <div class="c2 col-70">\n                <input type="text"\n                    ng-model="Show.writeTitle"\n                >\n            </div>\n        </div>\n\n        <div class="row r4 row-90">\n            <div class="c1 col">\n                <p class="label">내용</p>\n                <textarea\n                    ng-model="Show.writeContent"\n                ></textarea>\n            </div>\n        </div>\n\n        <div class="r5 row row-90 flex">\n            <div class="c1 col-90 col-button"\n                ng-click="Show.postHandler()"\n            >\n                <span>등록하기</span>\n            </div>\n        </div>\n    </ion-content>\n</ion-modal-view>\n');

            $templateCache.put('state/announcements/event/eventDetail.html', '<ion-view id="event-detail"\n    cache-view="false"\n    view-title="이벤트"\n    can-swipe-back="false"\n    hide-back-button="false"\n    hide-nav-bar="false"\n>\n    <!-- List Content -->\n    <ion-content class="has-header">\n\n        <div class="r1 row zero">\n            <div class="c1 col zero">\n                <h2 class="title">{{ EventDetail.Model.post.title }}</h2>\n            </div>\n        </div>\n\n        <div class="r2 row flex">\n            <div class="c1 col">\n                <img ng-src="{{EventDetail.Model.post.photos[0] &&  EventDetail.Model.post.photos[0].url}}">\n            </div>\n        </div>\n\n        <div class="r3 row">\n            <div class="c1 col">\n                <p> {{ EventDetail.Model.post.content }}</p>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/announcements/event/eventList.html', '<ion-view id="event-list"\n    view-title="이벤트"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="true"\n    hide-nav-bar="false"\n>\n    <!-- Set navigation header -->\n    <ion-nav-buttons side="left">\n        <button class="button button-icon icon ion-navicon"\n            ng-click="Main.toggleSideMenu()"\n        >\n        </button>\n    </ion-nav-buttons>\n\n    <!-- List Content -->\n    <ion-content class="has-header">\n        <ion-refresher\n            pulling-text="새로운 내용이 있는지 보시려면 힘것 당기세요."\n            on-refresh="EventList.getNewerPosts()"\n            disable-pulling-rotation="false"\n        >\n        </ion-refresher>\n\n        <div class="r1 row no-post row-90 flex radius"\n            ng-if=""\n        >\n            <div class="c1 col">\n                <h2 class="title">오늘 nail 이벤트</h2>\n                <p class="message">진행중인 이벤트가 없습니다.</p>\n            </div>\n        </div>\n\n        <ion-list>\n            <ion-item class="r2 row-items row zero"\n                collection-repeat="post in EventList.Model.postsWrapper.posts"\n                item-width="95%"\n                item-height="vw * 0.30"\n                item-render-buffer="3"\n                force-refresh-images="false"\n                ng-click="EventList.goToDetailHandler(post)"\n                touch\n            >\n                <div class="c1 col-30 image zero flex">\n                    <img ng-src="{{post.photos[0] && post.photos[0].url}}">\n                </div>\n\n                <div class="c2 col-70 content">\n                    <h2 class="title">\n                        {{ post.title }}\n                    </h2>\n                    <p class="content">\n                        TODO:{{ post.summary }}\n                    </p>\n                </div>\n            </ion-item>\n        </ion-list>\n        <ion-infinite-scroll\n            on-infinite="EventList.getOlderPosts()"\n            distance="1%"\n            spinner="true"\n            immediate-check="false"\n            ng-if="EventList.checkForMore()"\n        >\n        </ion-infinite-scroll>\n\n    </ion-content>\n\n</ion-view>\n');

            $templateCache.put('state/announcements/notice/noticeDetail.html', '<ion-view id="notice-detail"\n    cache-view="false"\n    view-title="공지 사항"\n    can-swipe-back="false"\n    hide-back-button="false"\n    hide-nav-bar="false"\n>\n    <!-- List Content -->\n    <ion-content class="has-header">\n\n        <div class="r1 row">\n            <div class="c1 col">\n                <p> {{ NoticeDetail.Model.post.content }}</p>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/announcements/notice/noticeList.html', '<ion-view id="notice-list"\n    view-title="공지 사항"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="false"\n    hide-nav-bar="false"\n>\n    <!-- List Content -->\n    <ion-content class="has-header">\n        <ion-refresher\n            pulling-text="새로운 내용이 있는지 보시려면 힘것 당기세요."\n            on-refresh="NoticeList.getNewerPosts()"\n        >\n        </ion-refresher>\n\n        <div class="r1 no-post row no-post row-90 flex radius"\n            ng-if=""\n        >\n            <div class="c1 col">\n                <h2 class="title">오늘 nail 공지사항</h2>\n                <p class="message">공지사항이 없습니다.</p>\n            </div>\n        </div>\n\n        <ion-list>\n            <ion-item class="r2 row-items row zero flex"\n                collection-repeat="post in NoticeList.Model.postsWrapper.posts"\n                item-width="100%"\n                item-height="vw * 0.16"\n                item-render-buffer="3"\n                force-refresh-images="false"\n                ng-click="NoticeList.goToDetailHandler(post)"\n                touch\n            >\n                <div class="c1 col-10 col image flex">\n                    <i class="notice-icon"></i>\n                </div>\n\n                <div class="c2 col-60 col content">\n                    <span class="col">{{post.title}}</span>\n                </div>\n\n                <div class="c3 col-30 col flex">\n                    <span class="time col">{{ post.createdAt | date : format : timezone }}</span>\n                </div>\n\n            </ion-item>\n        </ion-list>\n        <!-- Checked immediately as soon as page is entered. -->\n        <ion-infinite-scroll\n            on-infinite="NoticeList.getOlderPosts()"\n            distance="1%"\n            spinner="true"\n            immediate-check="false"\n            ng-if="NoticeList.checkForMore()"\n        >\n        </ion-infinite-scroll>\n\n    </ion-content>\n\n</ion-view>\n');

            $templateCache.put('state/balance/detail/balanceDetail.html', '<ion-view id="balance-detail" view-title="place.title">\n    <ion-content>\n        <div class="row r1 flex">\n            <div class="c1 col-40">\n                <i class="money-icon"></i>\n            </div>\n        </div>\n\n        <div class="row r2">\n            <div class="col c1">\n                <h3>place.title</h3>\n                <span class="name">user.username</span><span class="text">님의 남은 적립금</span>\n            </div>\n        </div>\n\n        <div class="row r3 radius-top radius-bottom flex auto">\n            <div class="col-90 c1">\n                <span>place.money</span>\n            </div>\n            <div class="col-10 c2">\n                <span>원</span>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/balance/list/balanceList.html', '<ion-view id="balance-list"\n    view-title="적립금 확인"\n>\n    <ion-content>\n        <ul class="list">\n            <li class="r1 shop-list row row-item auto radius-top radius-bottom shadow"\n                ng-repeat="place in BalanceList.places"\n            >\n                <div class="c1 col-25 place-image flex">\n                    <img src="http://placehold.it/100x100" alt="">\n                </div>\n                <div class="c2 col-75 row wrap zero">\n                    <div class="col-100 place-name">\n                        <span>{{ place.title }}</span>\n                    </div>\n                    <div class="col-100 row detail">\n                        <div class="col-10">\n                            <i class="place-icon"></i>\n                        </div>\n                        <div class="col-57 place-address">\n                            <span>{{ place.address }}</span>\n                        </div>\n                        <div class="col-33">\n                            <i class="coin-icon"></i>\n                        </div>\n                    </div>\n                </div>\n\n            </li>\n        </ul>\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/show/detail/showDetail.html', '<ion-view id="show-detail"\n    view-title="네일 talk"\n    can-swipe-back="false"\n    hide-back-button="false"\n    hide-nav-bar="false"\n>\n    <!-- List Content -->\n    <ion-nav-buttons side="right">\n        <button class="button button-icon icon ion-ios-star-outline"\n            ng-click="ShowDetail.toggleSavePost()"\n            ng-class="{\'favorite-post\': ShowDetail.styleFavorite}"\n        >\n        </button>\n    </ion-nav-buttons>\n\n    <ion-content class="has-header">\n        <div class="r1 row zero">\n            <div class="c1 col zero">\n                <img ng-src="{{ShowDetail.Model.current.photos[0].url}}">\n            </div>\n        </div>\n        <div class="r2 row">\n            <div class="c1 col">\n                <h3 class="title">{{ShowDetail.Model.current.title}}</h3>\n                <p class="username">{{ShowDetail.Model.current.createdBy.username}}</p>\n                <div class="row counts zero">\n                    <div class="col-5 flex icon-container zero"\n                        toggle\n                    >\n                        <i class="icon ion-star"></i>\n                    </div>\n                    <div class="col-8 like-count count">\n                        <span> {{ ShowDetail.Model.current.likes }} </span>\n                    </div>\n                    <div class="col-5 flex icon-container">\n                        <i class="icon ion-ios-chatbubble"></i>\n                    </div>\n                    <div class="col-10 comment-count count">\n                        <span> {{ ShowDetail.Model.current.comments.length }} </span>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class="r3 row">\n            <div class="c1 col-70">\n                <textarea class="radius-bottom radius-top" type="text"\n                    ng-model="ShowDetail.comment"> </textarea>\n            </div>\n            <div class="c2 col-23 radius-bottom radius-top flex"\n                touch\n                ng-click="ShowDetail.addComment(ShowDetail.comment)"\n            >\n                <span class="col">Comment</span>\n            </div>\n        </div>\n\n        <div class="r4 row"\n            ng-repeat="comment in ShowDetail.Model.current.comments"\n        >\n            <div class="c1 col">\n                <h3 class="username">{{ comment.createdBy.nickname }}</h3>\n                <p class="comment">{{ comment.content }}</p>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/show/list/showList.html', '<ion-view id="show-list"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="false"\n    hide-nav-bar="false"\n    view-title="네일 talk"\n>\n    <!-- List Content -->\n    <ion-content class="has-header">\n\n        <ion-refresher\n            pulling-text="새로운 내용이 있는지 보시려면 힘것 당기세요."\n            on-refresh="ShowList.getNewerPosts()"\n            disable-pulling-rotation="false"\n        >\n        </ion-refresher>\n\n        <ion-list class="r1 row-list row wrap zero">\n            <ion-item class="col items"\n                collection-repeat="post in ShowList.Model.postsWrapper.posts"\n                item-width="50%"\n                item-height="vw * 0.69"\n                item-render-buffer="3"\n                force-refresh-images="false"\n                ng-click="ShowList.goToDetailHandler(post)"\n                touch\n            >\n                    <img class="title-image" ng-src="{{ post.photos[0].url || \'http://placehold.it/500x500\'}}"\n                    >\n                    <p class="title">{{ post.title }}</p>\n                    <p class="user-id">{{ post.createdBy.username }}</p>\n                    <div class="row counts">\n                        <div class="col-10 flex icon-container"\n                            toggle\n                        >\n                            <i class="icon ion-star"></i>\n                        </div>\n                        <div class="col-20 like-count count">\n                            <span> {{post.likes}} </span>\n                        </div>\n                        <div class="col-10 flex icon-container">\n                            <i class="icon ion-ios-chatbubble"></i>\n                        </div>\n                        <div class="col-20 comment-count count">\n                            <span> {{ post.comments.length }} </span>\n                        </div>\n                    </div>\n\n            </ion-item>\n        </ion-list>\n        <!-- Checked immediately as soon as page is entered. -->\n        <ion-infinite-scroll\n            on-infinite="ShowList.getOlderPosts()"\n            distance="1%"\n            spinner="true"\n            immediate-check="false"\n            ng-if="ShowList.checkForMore()"\n        >\n        </ion-infinite-scroll>\n    </ion-content>\n</ion-view>\n');

            $templateCache.put('state/show/savedShow/savedShowList.html', '<!-- Saved show list -->\n<ion-view id="show-list"\n    cache-view="true"\n    can-swipe-back="false"\n    hide-back-button="false"\n    view-title="마이 갤러리"\n    hide-nav-bar="false"\n>\n    <!-- List Content -->\n    <ion-content class="has-header">\n\n        <ion-list class="r1 row-list row wrap zero">\n            <ion-item class="col items"\n                collection-repeat="post in SavedShowList.Model.posts"\n                item-width="50%"\n                item-height="vw * 0.69"\n                item-render-buffer="3"\n                force-refresh-images="false"\n                ng-click="SavedShowList.goToDetailHandler(post)"\n                touch\n            >\n                    <img class="title-image" ng-src="{{ post.photos[0] && post.photos[0].url }}"\n                    >\n                    <p class="title">{{ post.title }}</p>\n                    <p class="user-id">TODO:{{ post.createdBy.nickname }}</p>\n                    <div class="row counts">\n                        <div class="col-10 flex icon-container"\n                            toggle\n                        >\n                            <i class="icon ion-star"></i>\n                        </div>\n                        <div class="col-20 like-count count">\n                            <span> TODO:{{ post.likeCount }} </span>\n                        </div>\n                        <div class="col-10 flex icon-container">\n                            <i class="icon ion-ios-chatbubble"></i>\n                        </div>\n                        <div class="col-20 comment-count count">\n                            <span> TODO:{{ post.comments.length }} </span>\n                        </div>\n                    </div>\n\n            </ion-item>\n        </ion-list>\n    </ion-content>\n</ion-view>\n');









            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });

            AuthService.login('admin', 'admin1234');

            $state.go('main.home');
        }
    ])

    .config([

        '$stateProvider', '$httpProvider',

        function($stateProvider, $httpProvider) {

            // Security handler
            $httpProvider.interceptors.push('AuthInterceptor');

            // Allow session
            // $httpProvider.defaults.withCredentials = true;

            $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'state/login/login.html',
                controller: 'LoginController as Login'
            })

            .state('main', {
                url: '/main',
                templateUrl: 'state/main/main.html',
                controller: 'MainController as Main'
            })

            .state('main.home', {
                url: '/home',
                views: {
                    main: {
                        templateUrl: 'state/mainHome/mainHome.html',
                        controller: 'MainHomeController as Home'
                    }
                }
            })

            .state('main.list', {
                url: '/list',
                views: {
                    main: {
                        templateUrl: 'state/list/list.html',
                        controller: 'ListController as List'
                    }
                }
            })

            .state('main.daumMap', {
                url: '/daumMap/:from',
                views: {
                    main: {
                        templateUrl: 'state/daumMap/daumMap.html',
                        controller: 'DaumMapController as Map'
                    }
                }
            })

            .state('main.detail', {
                url: '/detail/:id',
                views: {
                    main: {
                        templateUrl: 'state/detail/detail.html',
                        controller: 'DetailController as Detail'
                    }
                }
            })

            .state('main.schedule', {
                url: '/schdule/:id/:selectedDate',
                views: {
                    main: {
                        templateUrl: 'state/schedule/schedule.html',
                        controller: 'ScheduleController as Schedule'
                    }
                }
            })

            .state('main.balance', {
                url: '/balance',
                abstract: true,
                views: {
                    main: {
                        templateUrl: 'state/balance/balance.html',
                        controller: 'BalanceController as Balance'
                    }
                }
            })
                .state('main.balance.list', {
                    url: '/list',
                    views: {
                        balance: {
                            templateUrl: 'state/balance/list/balanceList.html',
                            controller: 'BalanceListController as BalanceList'
                        }
                    }
                })
                .state('main.balance.detail', {
                    url: '/detail',
                    views: {
                        balance: {
                            templateUrl: 'state/balance/detail/balanceDetail.html',
                            controller: 'BalanceDetailController as BalanceDetail'
                        }
                    }
                })

            .state('main.cancel', {
                url: '/cancel',
                views: {
                    main: {
                        templateUrl: 'state/cancel/cancel.html',
                        controller: 'CancelController as Cancel'
                    }
                }
            })

            .state('main.favorite', {
                url: '/favorite',
                views: {
                    main: {
                        templateUrl: 'state/favorite/favorite.html',
                        controller: 'FavoriteController as Favorite'
                    }
                }
            })

            .state('main.show', {
                url: '/show',
                abstract: true,
                views: {
                    main: {
                        templateUrl: 'state/show/show.html',
                        controller: 'ShowController as Show'
                    }
                }
            })
                .state('main.show.list', {
                    url: '/list',
                    views: {
                        show: {
                            templateUrl: 'state/show/list/showList.html',
                            controller: 'ShowListController as ShowList'
                        }
                    }
                })
                .state('main.show.savedList', {
                    url: '/savedList',
                    views: {
                        show: {
                            templateUrl: 'state/show/savedShow/savedShowList.html',
                            controller: 'SavedShowListController as SavedShowList'
                        }
                    }
                })
                .state('main.show.detail', {
                    url: '/detail/:id',
                    views: {
                        show: {
                            templateUrl: 'state/show/detail/showDetail.html',
                            controller: 'ShowDetailController as ShowDetail'
                        }
                    }
                })

            .state('main.announcements', {
                abstract: true,
                url: '/announcements',
                views: {
                    main: {
                        templateUrl: 'state/announcements/announcements.html',
                        controller: 'AnnouncementsController as Announcements'
                    }
                }
            })
                .state('main.announcements.eventList', {
                    url: '/eventList',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/event/eventList.html',
                            controller: 'EventListController as EventList'
                        }
                    }
                })
                .state('main.announcements.eventDetail', {
                    url: '/eventDetail/:id',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/event/eventDetail.html',
                            controller: 'EventDetailController as EventDetail'
                        }
                    }
                })
                .state('main.announcements.noticeList', {
                    url: '/noticeList',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/notice/noticeList.html',
                            controller: 'NoticeListController as NoticeList'
                        }
                    }
                })
                .state('main.announcements.noticeDetail', {
                    url: '/noticeDetail/:id',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/notice/noticeDetail.html',
                            controller: 'NoticeDetailController as NoticeDetail'
                        }
                    }
                })
        } //END
    ]);

})();
