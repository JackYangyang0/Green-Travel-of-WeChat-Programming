package com.wechat.travel.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeDAO {

    String queryType(@Param("typeId") int typeId);

}
