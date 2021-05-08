package com.wechat.travel;

import com.wechat.travel.entity.Msg;
import com.wechat.travel.service.MsgService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class TravelApplicationTests {

    @Autowired
    MsgService msgService;

    @Test
    void contextLoads() {
    }

    @Test
    public void test1(){
        List<Msg> msgs = msgService.queryAllMsg();
        for (Msg msg : msgs) {
            System.out.println(msg);
        }
    }

}
