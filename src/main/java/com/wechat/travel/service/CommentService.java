package com.wechat.travel.service;

import com.wechat.travel.entity.Comment;

import java.util.List;

public interface CommentService {

    int saveComment(Comment comment);

    List<Comment> queryAllCommentByMsgId(int msgId);

    // 查询评论者头像
    String queryAvatarUrl(String openid);

}
