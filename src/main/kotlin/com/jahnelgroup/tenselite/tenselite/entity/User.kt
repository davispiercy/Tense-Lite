package com.jahnelgroup.tenselite.tenselite.entity

import javax.persistence.*

@Entity
@Table(name = "users")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L

    @Column(name = "uid")
    var uid = ""

    @Column(name = "first_name")
    var first_name = ""

    @Column(name = "last_name")
    var last_name =""

    @Column(name = "email")
    var email = ""

    @Column(name = "sec_group")
    var sec_group = "basic"

    @Column(name = "enabled")
    var enabled: Boolean = true
}