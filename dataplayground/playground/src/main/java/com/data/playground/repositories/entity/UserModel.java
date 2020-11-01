package com.data.playground.repositories.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="DP_User")
public class UserModel {

    @Id
    @Column(name="id")
    private String id;
    @Column(name="user_name")
    private String userName;
    @Column(name="user_email")
    private String userEmail;

    public String getId() {
        return id;
    }

    public void setId(String userid) {
        this.id = userid;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
