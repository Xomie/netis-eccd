<?php

namespace App\Models;

use App\Models\Teacher;
use App\Models\Barangay;
use Illuminate\Database\Eloquent\Model;

class ChildProfile extends Model
{
      protected $fillable = [
        'child_number',
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'birthdate',
        'gender',
        'guardian',
        'contact_number',
        'barangay',
        'street',
        'house_number',
        'child_session',
        'barangay_id',
        'teacher_id',
        'profile',
    ];

    public function barangay_data()
    {
        return $this->belongsTo(Barangay::class, 'barangay_id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
