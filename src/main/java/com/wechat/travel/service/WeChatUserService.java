package com.wechat.travel.service;

import com.wechat.travel.entity.WeChatUser;

public interface WeChatUserService {

    WeChatUser isRegister(String openid);

    int saveWeChatUserOpenid(String openid);

    int saveWeChatUser(WeChatUser weChatUser);

}
