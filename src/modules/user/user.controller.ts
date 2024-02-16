import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const dataBody = {
      service: 'EA',
      quantity: 20,
    };
  
    const data = [];
  
    const generateNewData = (startSerial: string, quantity: number) => {
      const newData = [];
  
      let serialNumber = parseInt(startSerial.substr(2), 10); // Extract numeric part and convert to integer
      for (let i = 0; i < quantity; i++) {
        const newSerialWithoutDigit = `${dataBody.service}${serialNumber.toString().padStart(8, '0')}`;
        const calculatedDigit = calculateDigit(newSerialWithoutDigit);
        const newSerial = `${newSerialWithoutDigit}${calculatedDigit}LA`;
        newData.push({ serial: newSerial });
        serialNumber++;
      }
  
      return newData;
    };
  
    const calculateDigit = (serialWithoutDigit: string): number => {
      const sum = Array.from(serialWithoutDigit).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (sum % 10 + 10) % 10;  // Ensure that the result is a positive number
    };
  
    // Find the maximum serial in existing data
    const maxSerial = data.reduce((max, item) => {
      const currentSerialNumber = parseInt(item.serial.substr(2, 8), 10);
      return currentSerialNumber > max ? currentSerialNumber : max;
    }, 0);
  
    // Generate new data starting from the maximum serial + 1
    const newGeneratedData = generateNewData(`${dataBody.service}${(maxSerial + 1).toString().padStart(8, '0')}`, dataBody.quantity);
  
    // Append the new generated data to the existing data
    const updatedData = [...data, ...newGeneratedData];
  
    console.log('Generated Data:', updatedData);
  
    // You can now use updatedData as needed, for example, save it to the database or return it from the API
    return this.userService.create(updatedData);
  }
  
  
  
  @Post('verify')
  verifyTrackingNumbers(@Body() body: { trackingNumbers: string[] }): { isValid: boolean[] } {
    const { trackingNumbers } = body;
    const isValidArray = trackingNumbers.map(trackingNumber => this.userService.verifyTrackingNumber(trackingNumber));
    return { isValid: isValidArray };
  }
  

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
