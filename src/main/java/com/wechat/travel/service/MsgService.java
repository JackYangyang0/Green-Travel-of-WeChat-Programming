package com.wechat.travel.service;

import com.wechat.travel.entity.Msg;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MsgService {

    List<Msg> queryAllMsg();

    int queryTypeId(String typeName);

    int saveOneMsg(Msg msg);

    Msg queryOneByMsgId(Integer msgId);

    String queryAvatarUrlByOpenid(String writer);
}
