package com.wechat.travel.service.Impl;

import com.wechat.travel.dao.TypeDAO;
import com.wechat.travel.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;

public class TypeServiceImpl implements TypeService {

    @Autowired
    private TypeDAO typeDAO;

    @Override
    public String queryType(int typeId) {
        String typeName = typeDAO.queryType(typeId);
        return typeName;
    }
}
