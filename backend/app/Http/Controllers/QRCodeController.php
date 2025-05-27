<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QRCodeController extends Controller
{
    public function generate()
    {
        // Logic to generate QR code
        return response()->json(['message' => 'QR code generated successfully']);
    }

    public function validate(Request $request)
    {
        // Logic to validate QR code
        return response()->json(['message' => 'QR code validated successfully']);
    }
} 