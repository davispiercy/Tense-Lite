package com.jahnelgroup.tenselite.tenselite

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseToken
import org.springframework.stereotype.Component
import java.io.IOException
import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import com.jahnelgroup.tenselite.tenselite.service.UserService
import org.springframework.core.annotation.Order

@Component
@Order(1)
class AdminFilter(val userService: UserService) : Filter {

    fun checkAdmin(uid: String) {
        val group = userService.getRole(uid)
        if(group != "admin") {
            throw Exception("not admin")
        }
    }
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(
        request: ServletRequest,
        response: ServletResponse?,
        chain: FilterChain
    ) {
        val req: HttpServletRequest = request as HttpServletRequest
        //println(req.getHeader("jwt_string"))
        val jwt = req.getHeader("jwt_string").substring(7)
        //println(jwt)
        val decodedToken: FirebaseToken = FirebaseAuth.getInstance().verifyIdToken(jwt)

        val uid = decodedToken.uid

        //println(uid)
        checkAdmin(uid)
        println("test")
        chain.doFilter(request, response)
        //println(userService.getRole(uid))
    }
}