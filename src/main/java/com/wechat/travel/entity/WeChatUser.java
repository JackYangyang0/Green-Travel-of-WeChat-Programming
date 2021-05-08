package com.wechat.travel.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeChatUser implements Serializable {

    private String openid;

    private String avatarUrl;

    private String city;

    private String country;

    private int gender;

    private String language;

    private String nickName;

    private String province;

}
