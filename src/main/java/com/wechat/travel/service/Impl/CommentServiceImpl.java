package com.wechat.travel.service.Impl;

import com.wechat.travel.dao.CommentDAO;
import com.wechat.travel.entity.Comment;
import com.wechat.travel.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDAO commentDAO;

    @Override
    @Transactional
    public int saveComment(Comment comment) {
        int result = commentDAO.insertComment(comment);
        return result;
    }

    @Override
    public List<Comment> queryAllCommentByMsgId(int msgId) {
        List<Comment> comments = commentDAO.queryAllCommentByMsgId(msgId);
        return comments;
    }

    @Override
    public String queryAvatarUrl(String openid) {
        String avatarUrl = commentDAO.queryAvatarUrl(openid);
        return avatarUrl;
    }
}
