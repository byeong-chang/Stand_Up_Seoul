package com.project.backend.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping("/log")
@RequiredArgsConstructor
public class LogController {
    private String S3Bucket = "standupseoul/raw/spring_logs"; // Bucket 이름
    //
    private final AmazonS3Client amazonS3Client;

    @GetMapping("{datetime}")
    public void updateLog(@PathVariable String datetime) throws Exception {
        String fileName = "./log/info/spring_" + datetime+".log";
        File file = new File(fileName);
        String saveName = "spring_" + datetime.replace("-","")+ ".log";
        // S3에 업로드
        amazonS3Client.putObject(
                new PutObjectRequest(S3Bucket,saveName , file)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );
    }
}
