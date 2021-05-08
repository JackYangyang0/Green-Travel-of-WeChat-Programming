package com.wechat.travel.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    // 评论的id 唯一标识
    private int commentId;

    // 信息的id 该表的外键，用于连接msg和comment
    private int msgId;

    // 评论者 即user的nickname
    private String commenter;

    // 评论内容
    private String commentText;

    // 评论照片 存储照片的url
    private String commentImg;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss" , timezone = "GMT+8")
    // 评论时间
    private Date time;

    // 评论者的openid用于显示该用户
    private String openid;

    // 评论用户的头像
    private String avatarUrl;

}
