package com.wechat.travel.web;

import com.wechat.travel.entity.Comment;
import com.wechat.travel.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/setComment")
    @ResponseBody
    public Map<String , Object> setComment(HttpServletRequest request , Comment comment){
        Map<String , Object> map = new HashMap<>();
        String avatarUrl = commentService.queryAvatarUrl(comment.getOpenid());
        comment.setAvatarUrl(avatarUrl);
        int result = commentService.saveComment(comment);
        map.put("result", result);
        map.put("msgId", comment.getMsgId());
//        System.out.println(comment);
        return map;

    }

}
