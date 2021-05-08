package com.wechat.travel.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Configure {
    public static String mini_appID = "wxacbe4b10638ca15a";//appid，去自己的小程序后台找
    public static String mini_secret = "772df16c1db982438f04fe003c89ef8e";//appsecret，去自己小程序后台找
    public static String grant_type = "authorization_code";
}
