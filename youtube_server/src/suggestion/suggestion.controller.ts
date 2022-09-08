import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';


@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {
  }
  // data = [
  //   {text: "Hello, toi la teo", id: "1"},
  //   {text: "OMG, toi la ai", id: "2"},
  //   {text: "Chao, toi la teo", id: "3"},
  //   {text: "Toi la tun", id: "4"},
  // ]
  @Get('search')
  async SearchForSuggestion(@Query('key') key : string){
    console.log("Searching... with the title: " + key)
    let data = await this.suggestionService.findAllTitleData();
    let result = this.suggestionService.search(key,data);
    return result;
  }

  @Get('all')
  FindAllSuggestion(){
    let result = this.suggestionService.findAllTitleData();
    return result;
  }

  @Post('add')
  AddSuggestionToDB(@Body() body : any){
    return this.suggestionService.createTitleData(body);
  }
}
