package com.wechat.travel.web;

import com.wechat.travel.entity.Comment;
import com.wechat.travel.entity.Msg;
import com.wechat.travel.service.CommentService;
import com.wechat.travel.service.MsgService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/msg")
public class MsgController {

    @Autowired
    private MsgService msgService;

    @Autowired
    private CommentService commentService;

    @GetMapping("/showAllMsg")
    @ResponseBody
    public Map<String , List<Msg>> showAllMsg(HttpServletRequest request){
        Map<String , List<Msg>> map = new HashMap<>();
        List<Msg> msgs = msgService.queryAllMsg();
        for (Msg msg : msgs) {
            if(msg.getMsgImg() != null){
                String[] msgImgs = msg.getMsgImg().split(",");
                msg.setMsgImgs(msgImgs);
            }
        }
        map.put("data" , msgs);
        return map;
    }

    @PostMapping("/addMsg")
    @ResponseBody
    public Map<String , Integer> addMsg(HttpServletRequest request , @Param("data") Msg msg){
        Map<String , Integer> map = new HashMap<>();
        int typeId = msgService.queryTypeId(msg.getTypeName());
        msg.setTypeId(typeId);
        int result = msgService.saveOneMsg(msg);
        map.put("result" , result);
        return map;
    }

    @GetMapping("/detail/{id}")
    @ResponseBody
    public Map<String , Object> detail(HttpServletRequest request , @PathVariable("id") Integer msgId){
        Msg msg = msgService.queryOneByMsgId(msgId);
        String[] msgImgs = msg.getMsgImg().split(",");
        msg.setMsgImgs(msgImgs);
        String avatarUrl = msgService.queryAvatarUrlByOpenid(msg.getWriter());
        msg.setAvatarUrl(avatarUrl);
        List<Comment> comments = commentService.queryAllCommentByMsgId(msgId);
        Map<String , Object> map = new HashMap<>();
        map.put("msg" , msg);
        map.put("comments" , comments);
        return map;
    }
}
