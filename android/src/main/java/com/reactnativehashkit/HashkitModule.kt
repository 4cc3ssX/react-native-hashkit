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
import java.security.NoSuchAlgorithmException

class HashkitModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "Hashkit"
  }

  @ReactMethod
  fun md5(data: String, promise: Promise) {
    hash("MD5", data, promise)
  }

  @ReactMethod
  fun sha1(data: String, promise: Promise) {
    hash("SHA", data, promise)
  }

  @ReactMethod
  fun sha384(data: String, promise: Promise) {
    hash("SHA-384", data, promise)
  }

  @ReactMethod
  fun sha224(data: String, promise: Promise) {
    hash("SHA-224", data, promise)
  }

  @ReactMethod
  fun sha256(data: String, promise: Promise) {
    hash("SHA-256", data, promise)
  }

  @ReactMethod
  fun sha512(data: String, promise: Promise) {
    hash("SHA-512", data, promise)
  }

  @ReactMethod
  fun hmacSHA256(message: String, key: String, promise: Promise) {
    hmac(message, key, "HmacSHA256", promise)
  }
}

fun hash(algorithm: String, data: String, promise: Promise) {
  try {
    val dataBytes: ByteArray = data.toByteArray()
    val messageDigest = MessageDigest.getInstance(algorithm)
    val digest = messageDigest.digest(dataBytes)
    val hash = digest.fold("") { str, it -> str + "%02x".format(it) }
    promise.resolve(hash)
  } catch (e: NoSuchAlgorithmException) {
    promise.reject("HASH Generation Error", e.toString(), e)
  } catch (e: Exception) {
    promise.reject("HASH Generation Error", e.toString(), e)
  }
}

fun hmac(message: String, key: String, algorithm: String, promise: Promise) {
  try {
    val keySpec = SecretKeySpec(key.toByteArray(), algorithm)
    val mac = Mac.getInstance(algorithm)
    mac.init(keySpec)
    val sign = mac.doFinal(message.toByteArray())
      .joinToString("") { String.format("%02x", it and 255.toByte()) }
    promise.resolve(sign)
  } catch (e: Exception) {
    promise.reject("HMAC Generation Error", e.toString(), e)
  }
}
