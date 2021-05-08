package com.wechat.travel.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Msg {

    // 信息id 唯一标识
    private int msgId;

    // 信息分类标识
    private int categoryId;

    private String category = "";

    // 信息标题
    private String title = "";

    // 评论数
    private int commentNumber = 0;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss" , timezone = "GMT+8")
    // 发布时间
    private Date time;

    // 作者、发布者 即User的nickname
    private String writer;

    // 信息主要内容
    private String msgText;

    // 信息图片 存储图片的url
    private String msgImg;

    private String[] msgImgs;

    // 发布文章种类
    private int typeId;

    private String typeName;

    // 发布者头像
    private String avatarUrl;
}
