package com.wechat.travel.service.Impl;

import com.wechat.travel.dao.WeChatUserDAO;
import com.wechat.travel.entity.WeChatUser;
import com.wechat.travel.service.WeChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WeChatUserServiceImpl implements WeChatUserService {
    @Autowired
    private WeChatUserDAO weChatUserDAO;

    @Override
    @Transactional
    public WeChatUser isRegister(String openid) {
        WeChatUser weChatUser = weChatUserDAO.queryOneWeChatUser(openid);
        return weChatUser;
    }

    @Override
    @Transactional
    public int saveWeChatUserOpenid(String openid) {
        int res = weChatUserDAO.saveWeChatUserOpenid(openid);
        return res;
    }

    @Override
    @Transactional
    public int saveWeChatUser(WeChatUser weChatUser) {
        int result = weChatUserDAO.saveWeChatUser(weChatUser);
        return result;
    }


}
