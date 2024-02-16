import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
     
  }

  findAll() {
    return `good`;
  }

  calculateDigit(serialWithoutDigit: string): number {
    const sum = Array.from(serialWithoutDigit).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (sum % 10 + 10) % 10;  // Ensure that the result is a positive number
  }
  

  verifyTrackingNumber(trackingNumber: string): boolean {
    const pattern = /^EA\d{8}\dLA$/;
  
    if (pattern.test(trackingNumber)) {
      const serialWithoutDigit = trackingNumber.substring(0, trackingNumber.length - 3); // Remove the last 3 characters ("LA")
      const providedDigit = parseInt(trackingNumber.charAt(trackingNumber.length - 3), 10);
  
      // Calculate the correct digit
      const calculatedDigit = this.calculateDigit(serialWithoutDigit);
      console.log('calculatedDigit', calculatedDigit)
      console.log('providedDigit', providedDigit)
      // Verify if the provided digit matches the calculated one
      return providedDigit === calculatedDigit;
    }
  
    return false;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
