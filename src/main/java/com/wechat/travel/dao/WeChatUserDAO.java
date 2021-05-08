package com.wechat.travel.dao;

import com.wechat.travel.entity.WeChatUser;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WeChatUserDAO {

    WeChatUser queryOneWeChatUser(@Param("openid") String openid);

    int saveWeChatUserOpenid(@Param("openid") String openid);

    int saveWeChatUser(@Param("weChatUser") WeChatUser weChatUser);

}
