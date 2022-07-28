package com.jahnelgroup.tenselite.tenselite.entity

import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "time_entries")
class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L

    @Column(name = "user_id")
    var user_id: Long = 0L

    @Column(name = "project_id")
    var project_id: Long = 0L

    @Column(name = "entry_date")
    var entry_date: LocalDate? = null

    @Column(name = "notes")
    var notes: String? = null

    @Column(name = "hours")
    var hours: Double = 0.0

    @Column(name = "hourly_rate")
    var hourly_rate: Double = 0.0

    @Column(name = "entry_value")
    var entry_value: Double? = 0.0

    /*@Column(name = "billable")
    var billable: Boolean = false*/

    @Column(name = "enabled")
    var enabled: Boolean = true
}