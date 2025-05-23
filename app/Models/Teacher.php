<?php

namespace App\Models;

use App\Models\ChildProfile;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'full_name',
        'role'
    ];

     public function childProfiles()
    {
        return $this->hasMany(ChildProfile::class);
    }
}
