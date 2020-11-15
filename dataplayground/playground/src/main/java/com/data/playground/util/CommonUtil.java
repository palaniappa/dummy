package com.data.playground.util;

import com.data.playground.repositories.entity.UserModel;
import org.springframework.security.core.context.SecurityContextHolder;

public class CommonUtil {

    public static String getCurrentUserId() {
        UserModel user = (UserModel) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getId();
    }
}