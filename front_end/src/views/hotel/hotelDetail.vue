<template>
    <a-layout>
        <a-layout-content>
            <div class="hotelDetailCard">
                <h1>
                    {{ currentHotelInfo.title }}
                </h1>
                <div class="hotel-info">
                    <a-card style="width: 240px">
                        <img
                            alt="example"
                            v-bind:src= currentHotelInfo.imgUrl
                            slot="cover"
                            referrerPolicy="no-referrer"
                            />
                    </a-card>
                    <div class="info">
                        <div class="items" v-if="currentHotelInfo.name">
                            <span class="label">酒店名称：</span>
                            <span class="value">{{ currentHotelInfo.name }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.address">
                            <span class="label">地址</span>
                            <span class="value">{{ currentHotelInfo.address }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.hotelStar">
                            <span class="label">星级:</span>
                            <span class="value" v-if="currentHotelInfo.hotelStar=='Five'">五星级</span>
                            <span class="value" v-if="currentHotelInfo.hotelStar=='Four'">四星级</span>
                            <span class="value" v-if="currentHotelInfo.hotelStar=='Three'">三星级</span>
                            <a-rate style="font-size: 15px" :value=5 disabled allowHalf count=5 v-if="currentHotelInfo.hotelStar=='Five'"/>
                            <a-rate style="font-size: 15px" :value=4 disabled allowHalf count=4 v-if="currentHotelInfo.hotelStar=='Four'"/>
                            <a-rate style="font-size: 15px" :value=3 disabled allowHalf count=3 v-if="currentHotelInfo.hotelStar=='Three'"/>
                        </div>
                        <div class="items" v-if="currentHotelInfo.rate">
                            <span class="label">评分:</span>
                            <span class="value">{{ currentHotelInfo.rate }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.description">
                            <span class="label">酒店简介:</span> 
                            <span class="value">{{ currentHotelInfo.description }}</span>
                        </div>
                    </div>
                </div>
                <a-divider></a-divider>
                <a-tabs>
                    <a-tab-pane tab="全部房间" key="3" v-if="userInfo.userType==='HotelManager' && currentHotelInfo.managerId===userInfo.id ">
                        <AllRoomInfo :rooms="allRooms"></AllRoomInfo>
                    </a-tab-pane>
                    <a-tab-pane tab="房间信息" key="1">
                        <RoomList :rooms="currentHotelInfo.rooms"></RoomList>
                    </a-tab-pane>
                    <a-tab-pane tab="酒店环境" key="2">
<!--                            <span class="label">酒店简介:</span>-->
<!--                            <span class="value">{{ currentHotelInfo.description }}</span>-->
<!--                        <swiper-display ></swiper-display>-->
                        <dynamic-swipe></dynamic-swipe>
                    </a-tab-pane>
                    <a-tab-pane tab="酒店优惠" key="5">
                        <CouponCard v-for="coupon in couponList" v-bind:key="coupon.id" :coupon="coupon"></CouponCard>
                    </a-tab-pane>
                    <a-tab-pane tab="酒店评价" key="4">
                        <ShowComments v-for="hotelComment in hotelComments" v-bind:key="hotelComment.feedback" :comment="hotelComment"></ShowComments>
                    </a-tab-pane>
                </a-tabs>

            </div>
        </a-layout-content>
    </a-layout>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import RoomList from './components/roomList'
import AllRoomInfo from "./components/allRoomInfo";
import ShowComments from "./components/showComments";
import DynamicSwipe from "./components/DynamicSwipe";
import CouponCard from "./components/couponCard";
export default {
    name: 'hotelDetail',
    components: {
        DynamicSwipe,
        // SwiperDisplay,
        AllRoomInfo,
        RoomList,
        ShowComments,
        CouponCard,
    },
    data() {
        return {
            count:0,
            rateValue:0,
        }
    },
    computed: {
        ...mapGetters([
            'currentHotelInfo',
            'allRooms',
            'userInfo',
            'hotelComments',
            'currentHotelId',
            'couponList'
        ])
    },
    mounted() {
        this.set_visitCount(this.count)
        this.set_currentHotelId(Number(this.$route.params.hotelId))
        this.set_activeHotelId(Number(this.$route.params.hotelId))
        this.getHotelCoupon()
        this.getHotelById()
        this.clear_rooms()
        this.set_rateValue(this.currentHotelInfo.rate)
        this.count++;
        this.getHotelComments(this.currentHotelId)
        console.log(this.currentHotelInfo)
    },
    beforeRouteUpdate(to, from, next) {

        this.set_currentHotelId(Number(to.params.hotelId))
        this.getHotelById()
        next()
    },
    methods: {
        ...mapMutations([
            'set_currentHotelId',
            'set_visitCount',
            'clear_rooms',
            'set_hotelComments',
            'set_activeHotelId',
        ]),
        ...mapActions([
            'getHotelById',
            'getHotelComments',
            'getHotelCoupon',
        ]),
        set_rateValue(data){
            if(data-parseInt(data)>=0.5){
                this.rateValue=parseInt(data)+0.5
            }
            else{
                this.rateValue=data
            }
        }
    }
}
</script>
<style scoped lang="less">
    .hotelDetailCard {
        padding: 50px 50px;
        background-color: white;
    }
    .hotel-info {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        .info{
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .items {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .label{
                    margin-right: 10px;
                    font-size: 18px;
                }
                .value {
                    margin-right: 15px
                }
            }
        }
    }

</style>