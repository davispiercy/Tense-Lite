package com.jahnelgroup.tenselite.tenselite.entity

import java.time.LocalDate
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "projects")
class Project {
    @Id
    var id: Long = 0L

    @Column(name = "name")
    var name = ""

    @Column(name = "start_date")
    var start_date = LocalDate.parse("2000-01-01")

    @Column(name = "end_date")
    var end_date = LocalDate.parse("3000-01-01")

    @Column(name = "billable")
    var billable: Boolean = false

    @Column(name = "enabled")
    var enabled: Boolean = true
}