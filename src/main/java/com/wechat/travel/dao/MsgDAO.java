package com.wechat.travel.dao;

import com.wechat.travel.entity.Msg;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MsgDAO {

    List<Msg> queryAllMsg();

    int queryTypeId(@Param("typeName") String typeName);

    int saveOneMsg(@Param("msg") Msg msg);

    Msg queryOneMsg(@Param("msgId") Integer msgId);

    String queryAvatarUrlByOpenid(@Param("writer") String writer);

}
