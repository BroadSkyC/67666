package com.example.hotel.data.user;

import com.example.hotel.po.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
public interface AccountMapper {

    /**
     * 创建一个新的账号
     *
     * @return
     */
     int createNewAccount(User user);

    /**
     * 根据用户名查找账号
     * @param email
     * @return
     */
     User getAccountByName(@Param("email") String email);

     User getAccountById(@Param("id") int id);

    /**
     * 更新用户信息
     * @param id
     * @param password
     * @param username
     * @param phonenumber
     * @return
     */
     int updateAccount(@Param("id") int id, @Param("password") String password,@Param("userName") String username, @Param("phoneNumber") String phonenumber,@Param("imgUrl") String imgUrl);


    int updateCredit(@Param("id") int id, @Param("num") int num);

    int addCommonVip(User user);
    int addCompanyVip(User user);

    void updateUserCredit(@Param("id") Integer id, @Param("credit") Integer credit);

    int getUserCredit(@Param("id") Integer id);
    String getCompany(@Param("id") Integer id);

    void changePassword(@Param("id") Integer id,
                        @Param("password") String password);

    List<User> getAllUserInfo();
}
