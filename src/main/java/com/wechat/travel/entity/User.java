package com.wechat.travel.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private String username;

    private String password;

    private String phoneNum;

    private String nickname;

}
