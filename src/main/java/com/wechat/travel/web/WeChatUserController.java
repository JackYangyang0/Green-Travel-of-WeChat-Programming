package com.wechat.travel.web;

import com.wechat.travel.entity.WeChatUser;
import com.wechat.travel.service.WeChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/weChat")
public class WeChatUserController {

    @Autowired
    private WeChatUserService weChatUserService;

    @PutMapping("/saveUser")
    @ResponseBody
    public Map<String , Object> saveUser(HttpServletRequest request , WeChatUser weChatUser){
        int result = weChatUserService.saveWeChatUser(weChatUser);
        System.out.println(weChatUser);
        Map<String , Object> map = new HashMap<>();
        map.put("result" , result);
        return map;
    }
}
