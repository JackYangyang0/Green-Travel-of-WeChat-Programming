package com.wechat.travel.web;


import com.wechat.travel.config.Configure;
import com.wechat.travel.entity.User;
import com.wechat.travel.entity.WeChatUser;
import com.wechat.travel.service.UserService;
import com.wechat.travel.service.WeChatUserService;
import com.wechat.travel.utils.HttpUtil;
import com.wechat.travel.utils.JSON;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import net.sf.json.JSONObject;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;



@Controller
@RequestMapping("/user")
public class UserLoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private WeChatUserService weChatUserService;

    // 登陆功能 返回一个user信息
    @RequestMapping(value = "/login" , method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> login(HttpServletRequest request , @Param("username") String username,
                                      @Param("password") String password){
        User user = userService.login(username, password);
        Map<String , Object> map = new HashMap<>();
        if(user != null){
            map.put("code" , 200);
            map.put("result" , "登陆成功");
        }else{
            map.put("code" , 500);
            map.put("result" , "失败");
        }

        return map;
    }

    @RequestMapping(value = "/weChatLogin" , method = RequestMethod.POST)
    @ResponseBody
    public Map<String , Object> fastLogin(HttpServletRequest request , @RequestParam("code") String code){
        Map<String , Object> map = new HashMap<>();
        String result = "";
        try {
            result = HttpUtil.doGet("https://api.weixin.qq.com/sns/jscode2session?appid="
                            + Configure.mini_appID + "&secret="
                            + Configure.mini_secret + "&js_code="
                            + code
                            + "&grant_type=authorization_code", null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSONObject jsonObj = JSONObject.fromObject(result);//解析从微信服务器上获取到的json字符串
//        System.out.println(jsonObj);
//        System.out.println("用户的openid为："+jsonObj.get("openid"));//此处也可以得到session_key的值
        map.put("session_key",jsonObj.get("session_key").toString());
        map.put("openid",jsonObj.get("openid").toString());
//这里Miniuser类是自己的业务类，你可以根据自己需要自行定义
//        System.out.println(jsonObj.get("openid").toString());
        WeChatUser weChatUser = weChatUserService.isRegister(jsonObj.get("openid").toString());//去数据库判断用户是否存在该用户
        if(weChatUser != null)//如果存在该用户
        {
            map.put("openid",weChatUser.getOpenid());//将用户id返回
            return map;
        }
        //如果是新用户，就添加用户到数据库中
//        //将用户信息保存到数据库中
        weChatUserService.saveWeChatUserOpenid(jsonObj.get("openid").toString());

        map.put("openid",weChatUserService.isRegister(jsonObj.get("openid").toString()));

        return map;
    }

}
