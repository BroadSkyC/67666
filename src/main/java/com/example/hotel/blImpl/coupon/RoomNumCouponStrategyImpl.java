package com.example.hotel.blImpl.coupon;

import com.example.hotel.bl.coupon.CouponMatchStrategy;
import com.example.hotel.po.Coupon;
import com.example.hotel.vo.OrderVO;

public class RoomNumCouponStrategyImpl implements CouponMatchStrategy {
    @Override
    public boolean isMatch(OrderVO orderVO, Coupon coupon) {
        if(coupon.getCouponType()==2 && orderVO.getRoomNum()>=coupon.getTargetRoomNum())
            return true;
        return false;
    }
}
