package com.example.Config;

import java.io.Serializable;

/**
 * Created by Karolis on 2016.02.23.
 */
public class User implements Serializable{
    private String email;
    private String password;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}