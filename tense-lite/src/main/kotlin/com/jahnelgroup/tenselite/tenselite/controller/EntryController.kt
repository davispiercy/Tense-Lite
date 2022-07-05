package com.jahnelgroup.tenselite.tenselite.controller

import com.jahnelgroup.tenselite.tenselite.entity.Entry
import com.jahnelgroup.tenselite.tenselite.service.EntryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class EntryController (val entryService: EntryService){
    @GetMapping("/entries")
    fun findAll(): List<Entry> {
        return entryService.findAll()
    }
}