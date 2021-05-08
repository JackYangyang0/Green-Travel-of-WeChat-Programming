package com.wechat.travel.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDAO {

    String queryCategory(@Param("categoryId") int categoryId);

}
