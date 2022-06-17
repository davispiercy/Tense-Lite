package com.jahnelgroup.tenselite.tenselite.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DemoController {
    @GetMapping("/hello-world")
    fun helloWorld(): String {
        return "Hello World!"
    }
}