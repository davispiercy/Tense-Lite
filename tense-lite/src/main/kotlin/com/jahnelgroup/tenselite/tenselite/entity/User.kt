package com.jahnelgroup.tenselite.tenselite.entity

import javax.persistence.*

@Entity
@Table(name = "users")
class User {
    @Id
    @Column(name = "uid")
    var uid = ""

    @Column(name = "id")
    var id: Long = 0L

    @Column(name = "first_name")
    var first_name = ""

    @Column(name = "last_name")
    var last_name =""

    @Column(name = "email")
    var email = ""

    @Column(name = "sec_group")
    var sec_group = ""

    @Column(name = "enabled")
    var enabled: Boolean = true
}