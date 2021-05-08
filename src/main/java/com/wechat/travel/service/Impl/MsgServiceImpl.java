package com.wechat.travel.service.Impl;

import com.wechat.travel.dao.CategoryDAO;
import com.wechat.travel.dao.MsgDAO;
import com.wechat.travel.dao.TypeDAO;
import com.wechat.travel.entity.Msg;
import com.wechat.travel.service.MsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MsgServiceImpl implements MsgService {

    @Autowired
    private MsgDAO msgDAO;
    @Autowired
    private CategoryDAO categoryDAO;
    @Autowired
    private TypeDAO typeDAO;

    @Override
    @Transactional
    public List<Msg> queryAllMsg() {
        List<Msg> msgs = msgDAO.queryAllMsg();
        return msgs;
    }

    @Override
    @Transactional
    public int queryTypeId(String typeName) {
        int typeId = msgDAO.queryTypeId(typeName);
        return typeId;
    }

    @Override
    @Transactional
    public int saveOneMsg(Msg msg) {
        int result = msgDAO.saveOneMsg(msg);
        return result;
    }

    @Override
    @Transactional
    public Msg queryOneByMsgId(Integer msgId) {
        Msg msg = msgDAO.queryOneMsg(msgId);
        String category = categoryDAO.queryCategory(msg.getCategoryId());
        String typeName = typeDAO.queryType(msg.getTypeId());
        msg.setCategory(category);
        msg.setTypeName(typeName);
        return msg;
    }

    @Override
    @Transactional
    public String queryAvatarUrlByOpenid(String writer) {
        String avatarUrl = msgDAO.queryAvatarUrlByOpenid(writer);
        return avatarUrl;
    }
}
