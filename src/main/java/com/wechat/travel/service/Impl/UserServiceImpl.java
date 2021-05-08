package com.wechat.travel.service.Impl;

import com.wechat.travel.dao.UserDAO;
import com.wechat.travel.entity.User;
import com.wechat.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public User login(String username , String password) {
        User user = userDAO.login(username);
        if(user != null){
            if(user.getPassword().equals(password)){
                return user;
            }
        }
        return null;
    }
}
