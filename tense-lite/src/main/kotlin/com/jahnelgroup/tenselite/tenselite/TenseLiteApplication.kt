package com.jahnelgroup.tenselite.tenselite

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class TenseLiteApplication

fun main(args: Array<String>) {
	runApplication<TenseLiteApplication>(*args)
}
