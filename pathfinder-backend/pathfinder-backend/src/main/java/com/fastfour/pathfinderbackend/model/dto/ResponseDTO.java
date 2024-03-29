package com.fastfour.pathfinderbackend.model.dto;

public class ResponseDTO {

    private String username;
    private String token;

    public ResponseDTO(String username, String token) {
        this.username = username;
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "ResponseDTO{" +
                "username='" + username + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
