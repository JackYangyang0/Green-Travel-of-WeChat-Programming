package com.wechat.travel.dao;

import com.wechat.travel.entity.Comment;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDAO {

    int insertComment(@Param("comment") Comment comment);

    List<Comment> queryAllCommentByMsgId(int msgId);

    String queryAvatarUrl(@Param("openid") String openid);

}
