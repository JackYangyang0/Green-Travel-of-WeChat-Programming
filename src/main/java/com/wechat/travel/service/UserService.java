package com.wechat.travel.service;

import com.wechat.travel.entity.User;

public interface UserService {

    User login(String username , String password);

}
