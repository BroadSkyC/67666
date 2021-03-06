package com.example.hotel.vo;

import com.example.hotel.enums.UserType;
import com.example.hotel.enums.VipType;

/**
 * @author fjj
 * @date 2019/4/11 3:22 PM
 */
public class UserVO {
    private Integer id;
    private String email;
    private String password;
    private String userName;
    private String phoneNumber;
    private double credit;
    private UserType userType;
    private String birthday;
    private VipType vipType;
    private String company;
    private Integer hotelId;
    private String imgUrl;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public double getCredit() {
        return credit;
    }

    public void setCredit(double credit) {
        this.credit = credit;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getBirthday(){return birthday;};

    public void setBirthday(String birthday){this.birthday = birthday;};

    public VipType getVipType(){return  vipType;}

    public void setVipType(VipType vipType){this.vipType=vipType;}

    public  String getCompany(){return company;}

    public void setCompany(String company){this.company=company;}

    public Integer getHotelId(){return hotelId;}

    public void setHotelId(Integer hotelId){this.hotelId=hotelId;}

    public String getImgUrl(){return this.imgUrl;}

    public void setImgUrl(String url){this.imgUrl=url;}
}
