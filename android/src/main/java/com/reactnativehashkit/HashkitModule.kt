package com.reactnativehashkit

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import java.security.MessageDigest
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import kotlin.experimental.and
import java.lang.Exception

class HashkitModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "Hashkit"
  }

  @ReactMethod
  fun sha256(data: String, promise: Promise) {
    try {
      val dataBytes: ByteArray = data.toByteArray()
      val messageDigest = MessageDigest.getInstance("SHA-256")
      val digest = messageDigest.digest(dataBytes)
      val hash = digest.fold("") { str, it -> str + "%02x".format(it) }
      promise.resolve(hash)
    } catch (e: Exception) {
      promise.reject("SHA-256 Generation Error", e.toString(), e)
    }
  }

  @ReactMethod
  fun hmacSHA256(message: String, key: String, promise: Promise) {
    hmac(message, key, "HmacSHA256", promise)
  }
}

fun hmac(message: String, key: String, algorithm: String, promise: Promise) {
  try {
    val keySpec = SecretKeySpec(key.toByteArray(), algorithm)
    val mac = Mac.getInstance(algorithm)
    mac.init(keySpec)
    val sign = mac.doFinal(message.toByteArray()).joinToString("") { String.format("%02x", it and 255.toByte()) }
    promise.resolve(sign)
  } catch (e: Exception) {
    promise.reject("HMAC Generation Error", e.toString(), e)
  }
}
