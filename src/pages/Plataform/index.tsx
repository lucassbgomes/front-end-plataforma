import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';

import { Alert, Autocomplete, FormControl, FormHelperText, Grid, Snackbar, TextField, useMediaQuery, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import RestoreIcon from '@mui/icons-material/Restore';

import { Container, Content, ErrorMsg, ItemSelect, RestoreForm } from './styles';
import logo from '../../assets/images/logo.svg';
import { IPlataform, IPlataformLaboratory, IPlataformPropertyInfo } from '../../interfaces/Plataform';
import { format } from 'date-fns';
import { ISnackbar } from '../../interfaces/Snackbar';
import { Box } from '@mui/system';

const schemaForm = yup.object({
  nome: yup.string().required(),
  dataInicial: yup.string().nullable().required(),
  dataFinal: yup.string().nullable().required(),
  infosPropriedade: yup.string().required(),
  laboratorio: yup.string().required(),
}).required();

const CHARACTER_LIMIT_NOME = 40;

function Plataform() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IPlataform>({
    resolver: yupResolver(schemaForm)
  });

  const theme = useTheme()
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'))

  const [snackbar, setSnackbar] = useState<ISnackbar>({
    vertical: 'bottom',
    horizontal: 'center',
    open: false,
    message: 'Preencha os campos obragatórios.',
    color: 'error',
    icon: <WarningIcon />,
  });

  const { vertical, horizontal, open, message, color, icon} = snackbar;

  const [nome, setNome] = useState('')
  const [infosPropriedade, setInfosPropriedade] = useState<IPlataformPropertyInfo | null>(null)
  const [laboratorio, setLaboratorio] = useState<IPlataformLaboratory | null>(null)
  const [cnpj, setCnpj] = useState('')

  const [infos, setInfos] = useState<IPlataformPropertyInfo[]>([])
  const [labs, setLabs] = useState<IPlataformLaboratory[]>([])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setSnackbar((old) => ({
        ...old,
        open: true,
        message: 'Preencha os campos obragatórios.',
        color: 'error',
        icon: <WarningIcon />,
      }))
    }
  }, [errors])
  
  const onSubmit = (data: IPlataform) => {
    try {
      const { nome, dataInicial, dataFinal, observacoes } = data;

      const newDataInicial =  dataInicial && format(new Date(dataInicial), "yyy-MM-dd'T'HH:mm:ss'Z'"); 
      const newDataFinal =  dataFinal && format(new Date(dataFinal), "yyy-MM-dd'T'HH:mm:ss'Z'"); 

      const newData = {
        nome,
        dataInicial: newDataInicial,
        dataFinal: newDataFinal,
        infosPropriedade: {
          id: infosPropriedade?.id,
          nome: infosPropriedade?.nome,
        },
        cnpj,
        laboratorio: {
          id: laboratorio?.id,
          nome: laboratorio?.nome,
        },
        observacoes
      }
      
      console.log(newData)

      setSnackbar((old) => ({
        ...old,
        open: true,
        message: 'Cadastro realizado com sucesso!',
        color: 'success',
        icon: <CheckIcon />,
      }))
    } catch {
      setSnackbar((old) => ({
        ...old,
        open: true,
        message: 'Ocorreu um erro.',
        color: 'error',
        icon: <WarningIcon />,
      }))
    }
  }

  const resetForm = () => {
    window.location.href = '/';
  }

  const handleNome = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNome(event.target.value)
  }

  const handleInfosPropriedade = (event: any, value: IPlataformPropertyInfo | null) => {
    setInfosPropriedade(value)

    if (value) {
      setCnpj(value.cnpj)
    } else {
      setCnpj('')
    }
  }

  const handleLaboratorio = (event: any, value: IPlataformLaboratory | null) => {
    setLaboratorio(value)
  }

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar((old) => ({
      ...old,
      open: false,
    }))
  };

  const fillInfosPropriedade = useCallback(async () => {
    try {
      const { data } = await axios.get('api/infospropriedades')

      const { infospropriedades } = data

      setInfos(infospropriedades as IPlataformPropertyInfo[])
    } catch (error) {
      console.error('Erro infos: ', error)
    }
  }, [])

  const fillLaboratorio = useCallback(async () => {
    try {
      const { data } = await axios.get('api/laboratorios')

      const { laboratorios } = data

      setLabs(laboratorios as IPlataformLaboratory[])
    } catch (error) {
      console.error('Erro laboratorio: ', error)
    }
  }, [])

  const loading = useRef(true)

  useEffect(() => {
    if (loading.current) {
      fillInfosPropriedade();
      fillLaboratorio();

      loading.current = false;
    }
  }, [fillInfosPropriedade, fillLaboratorio])

  return (
    <Container>
      <header>
          <img src={logo} className="App-logo" alt="logo" />
      </header>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <header>
            <h3>Teste front-end</h3>
            <button type='submit'>salvar</button>
          </header>

          <div>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.nome}>
                  <TextField
                    label="Nome *"
                    variant="standard"
                    fullWidth
                    error={!!errors.nome}
                    inputProps={{ maxLength: CHARACTER_LIMIT_NOME }}
                    helperText={`${nome.length}/${CHARACTER_LIMIT_NOME}`}
                    FormHelperTextProps={{sx: {textAlign: 'right'}}}
                    {...register("nome")}
                    onChange={(event) => handleNome(event)}
                  />
                  {errors.nome && <ErrorMsg><WarningIcon /> <span>Error</span></ErrorMsg>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} mt={matchesXS ? 5 : 0}>
                <FormControl fullWidth>
                  <Controller
                    name="dataInicial"
                    control={control}
                    defaultValue={null}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <DatePicker
                        label="Data Inicial *"
                        openTo="day"
                        views={['year', 'month', 'day']}
                        value={value}
                        onChange={(value) =>
                          onChange(value)
                        }
                        renderInput={(params) => <TextField error={!!error} id="dataInicial" variant="standard" fullWidth {...params} />}
                      />
                    )}
                  />
                  {errors.dataInicial && <ErrorMsg><WarningIcon /> <span>Error</span></ErrorMsg>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} mt={matchesXS ? 5 : 0}>
                <FormControl fullWidth error={!!errors.dataFinal}>
                  <Controller
                    name="dataFinal"
                    control={control}
                    defaultValue={null}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <DatePicker
                        label="Data Final *"
                        openTo="day"
                        views={['year', 'month', 'day']}
                        value={value}
                        onChange={(value) =>
                          onChange(value)
                        }
                        renderInput={(params) => <TextField error={!!error} id="dataFinal" variant="standard" fullWidth helperText="Info" FormHelperTextProps={{sx: {textAlign: 'right'}}} {...params} />}
                      />
                    )}
                  />
                  {errors.dataFinal && <ErrorMsg><WarningIcon /> <span>Error</span></ErrorMsg>}
                </FormControl>
              </Grid>
            </Grid>

            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6} mt={5}>
                <FormControl variant="standard" fullWidth error={!!errors.infosPropriedade}>
                  {infos.length > 0 && (
                    <Autocomplete
                      disablePortal
                      id="infosPropriedade"
                      options={infos}
                      value={infosPropriedade}
                      onChange={handleInfosPropriedade}
                      fullWidth
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) => option.nome}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          <ItemSelect>
                            <span className="nome">{option.nome}</span>
                            <span className="cnpj">{option.cnpj}</span>
                          </ItemSelect>
                        </Box>
                      )}
                      renderInput={(params) => <TextField {...params} variant="standard" label="Propriedade *" error={!!errors.infosPropriedade} id="infosPropriedade" {...register("infosPropriedade")} />}
                    />
                  )}
                  {(!errors.infosPropriedade && cnpj !== '') && <FormHelperText>CNPJ {cnpj}</FormHelperText>}
                  {errors.infosPropriedade && <ErrorMsg><WarningIcon /> <span>Error</span></ErrorMsg>}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} mt={5}>
                <FormControl variant="standard" fullWidth error={!!errors.laboratorio}>
                  {labs.length > 0 && (
                    <Autocomplete
                      disablePortal
                      id="laboratorio"
                      options={labs}
                      value={laboratorio}
                      onChange={handleLaboratorio}
                      fullWidth
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) => option.nome}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          <ItemSelect>
                            <span className="nome">{option.nome}</span>
                          </ItemSelect>
                        </Box>
                      )}
                      renderInput={(params) => <TextField {...params} variant="standard" label="Laboratório *" error={!!errors.laboratorio} id="laboratorio" {...register("laboratorio")} />}
                    />
                  )}
                  {errors.laboratorio && <ErrorMsg><WarningIcon /> <span>Error</span></ErrorMsg>}
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={12} mt={5}>
                <TextField
                  id="observacoes"
                  label="Observações"
                  variant="standard"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("observacoes")}
                />
              </Grid>
            </Grid>
          </div>
        </Content>

        {color === 'success' && (
          <RestoreForm>
            <button type="button" onClick={resetForm}>
              <RestoreIcon />
              <span>
                <strong>REINICIAR</strong>
                <span>Protótipo Desktop</span>
              </span>
            </button>
          </RestoreForm>
        )}
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} color={color} variant="filled" sx={{ width: '456px' }} icon={icon}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Plataform;
