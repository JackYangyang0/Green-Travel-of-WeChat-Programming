package com.wechat.travel.dao;

import com.wechat.travel.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO {

    User login(@Param("username") String username);

}
